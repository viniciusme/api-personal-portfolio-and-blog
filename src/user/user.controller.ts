import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';

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
  }

  @Post()
  async createOne(@Body() dto: CreateUserDto) {
    const data = await this.userService.createOne(dto);

    return {
      message: 'Usuário criado com sucesso!',
      data,
    };
  }

  @Put(':id')
  editOne() {}

  @Delete(':id')
  delete() {}
}
