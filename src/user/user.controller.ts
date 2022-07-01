import { AppResource, AppRoles } from './../app.roles';
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
import { Auth, User } from 'src/common/decorators';
import { RolesBuilder, InjectRolesBuilder } from 'nest-access-control';
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

  @Get(':id')
  async getOne(@Param('id') id: number) {
    const data = await this.userService.getOne(id);

    return { data };
  }

  @Post('register') // api/user/register - Rota Publica
  async publicRegistration(@Body() dto: UserRegistrationDto) {
    const data = await this.userService.createOne({
      ...dto,
      roles: [AppRoles.AUTHOR],
    });

    return {
      message: 'Usuário registrado com sucesso',
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
      // Se o usuário tem a possession ANY = ADMIN
      data = await this.userService.editOne(id, dto);
    } else {
      // Se ele tem a possession OWN = AUTHOR
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
      // Se o usuário tem a possession ANY = ADMIN
      data = await this.userService.deleteOne(id);
    } else {
      // Se ele tem a possession OWN = AUTHOR
      data = await this.userService.deleteOne(id, user);
    }

    return {
      message: 'Usuário deletado com sucesso',
      data,
    };
  }
}
