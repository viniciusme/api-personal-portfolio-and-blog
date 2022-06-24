import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePostDto } from './dtos';

@Controller('posts')
export class PostController {
  @Get()
  getMany() {
    return {
      message: 'Rota funcionando!',
    };
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return {
      message: 'getOne',
    };
  }

  @Post()
  createOne(@Body() dto: CreatePostDto) {
    return dto;
  }

  @Put(':id')
  editOne(@Param('id') id: string) {
    return {
      message: 'Post com ID alterado com sucesso!',
    };
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return {
      message: 'Post com ID deletado com sucesso!',
    };
  }
}
