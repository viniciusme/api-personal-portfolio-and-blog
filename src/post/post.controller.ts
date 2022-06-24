import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

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
  createOne(@Body('title') title: any) {
    console.log(title);
  }

  @Put(':id')
  editOne(@Param('id') id: string) {}

  @Delete(':id')
  deleteOne(@Param('id') id: string) {}
}
