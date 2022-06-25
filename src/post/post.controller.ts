import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePostDto, EditPostDto } from './dtos/index';

@Controller('posts')
export class PostController {
  @Get()
  getMany() {
    return {
      message: 'Rota funcionando!',
    };
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);
    return {
      message: 'getOne',
    };
  }

  @Post()
  createOne(@Body() dto: CreatePostDto) {
    return dto;
  }

  @Put(':id')
  editOne(@Param('id') id: string, @Body() dto: EditPostDto) {
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
