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
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto, EditPostDto } from './dtos';
import { PostService } from './post.service';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getMany() {
    const data = await this.postService.getMany();

    return {
      message: 'Solicitação realizada com sucesso!',
      data,
    };
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getOne(id);
  }

  @Post()
  createOne(@Body() dto: CreatePostDto) {
    return this.postService.createOne(dto);
  }

  @Put(':id')
  editOne(@Param('id') id: number, @Body() dto: EditPostDto) {
    return this.postService.editOne(id, dto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.postService.deleteOne(id);
  }
}
