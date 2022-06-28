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
import { CreateUserDto, EditUserDto } from '../user/dtos/index';
import { Auth } from 'src/common/decorators';

@ApiTags('Users Routes')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getMany() {
    const data = await this.userService.getMany();

    return {
      message: 'Solicitação realizada com sucesso!',
      data,
    };
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    const data = await this.userService.getOne(id);

    return {
      message: 'Usuário encontrado',
      data,
    };
  }

  @Auth()
  @Post()
  async createOne(@Body() dto: CreateUserDto) {
    const data = await this.userService.createOne(dto);

    return {
      message: 'Usuário criado com sucesso!',
      data,
    };
  }

  @Auth()
  @Put(':id')
  async editOne(@Param('id') id: number, @Body() dto: EditUserDto) {
    const data = await this.userService.editOne(id, dto);

    return {
      message: 'Usuário alterado com sucesso!',
      data,
    };
  }

  @Auth()
  @Delete(':id')
  async deleteOne(@Param('id') id: number) {
    const data = await this.userService.deleteOne(id);

    return {
      message: 'Usuário deletado com sucesso!',
      data,
    };
  }
}
