import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, EditUserDto, UserRegistrationDto } from './dtos';
import { AppRoles } from './../app.roles';
import { Auth, User } from 'src/common/decorators';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResource } from 'src/app.roles';
import { User as UserEntity } from './entities';

@ApiTags('Users Routes')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder,
  ) {}

  @Get()
  async getMany() {
    const data = await this.userService.getMany();

    return {
      message: 'Solicitação realizada com sucesso',
      data,
    };
  }

  @Post('register')
  async publicRegistration(@Body() dto: UserRegistrationDto) {
    const data = await this.userService.createOne({
      ...dto,
      roles: [AppRoles.AUTHOR],
    });
    return { message: 'Usuário registrado com sucesso', data };
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    const data = await this.userService.getOne(id);

    return {
      message: 'Usuário encontrado',
      data,
    };
  }

  @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResource.USER,
  })
  @Post()
  async createOne(@Body() dto: CreateUserDto) {
    const data = await this.userService.createOne(dto);

    return {
      message: 'Usuário criado com sucesso',
      data,
    };
  }

  @Auth({
    possession: 'own',
    action: 'update',
    resource: AppResource.USER,
  })
  @Put(':id')
  async editOne(
    @Param('id') id: number,
    @Body() dto: EditUserDto,
    @User() user: UserEntity,
  ) {
    let data;

    if (this.rolesBuilder.can(user.roles).updateAny(AppResource.USER).granted) {
      // Este é usuário ADMIN
      data = await this.userService.editOne(id, dto);
    } else {
      // Este é usuário AUTHOR
      const { roles, ...rest } = dto;
      data = await this.userService.editOne(id, rest, user);
    }
    return { message: 'Usuário editado com sucesso', data };
  }

  @Auth({
    action: 'delete',
    possession: 'own',
    resource: AppResource.USER,
  })
  @Delete(':id')
  async deleteOne(@Param('id') id: number, @User() user: UserEntity) {
    let data;

    if (this.rolesBuilder.can(user.roles).updateAny(AppResource.USER).granted) {
      // Este é usuário ADMIN
      data = await this.userService.deleteOne(id);
    } else {
      // Este é usuário AUTHOR
      data = await this.userService.deleteOne(id, user);
    }
    return { message: 'Usuário editado com sucesso', data };
  }
}
