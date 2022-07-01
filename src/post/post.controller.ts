import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResource } from 'src/app.roles';
import { PostService } from './post.service';
import { CreatePostDto, EditPostDto } from './dtos';
import { User, Auth } from 'src/common/decorators';
import { User as UserEntity } from 'src/user/entities';

@ApiTags('Post Routes')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    @InjectRolesBuilder()
    private readonly roleBuilder: RolesBuilder,
  ) {}

  @Get()
  async getMany() {
    const data = await this.postService.getMany();

    return {
      message: 'Solicitação realizada com sucesso',
      data,
    };
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.postService.getById(id);

    return {
      message: 'Solicitação realizada com sucesso',
      data,
    };
  }

  @Auth({
    resource: AppResource.POST,
    action: 'create',
    possession: 'own',
  })
  @Post()
  async createPost(@Body() dto: CreatePostDto, @User() author: UserEntity) {
    const data = await this.postService.createOne(dto, author);

    return {
      message: 'Post criado com sucesso',
      data,
    };
  }

  @Auth({
    resource: AppResource.POST,
    action: 'update',
    possession: 'own',
  })
  @Put(':id')
  async editOne(
    @Param('id') id: number,
    @Body() dto: EditPostDto,
    @User() author: UserEntity,
  ) {
    let data;

    if (
      this.roleBuilder.can(author.roles).updateAny(AppResource.POST).granted
    ) {
      //Admin pode editar qualquer post
      data = await this.postService.editOne(id, dto);
    } else {
      // Author pode editar apenas seus próprios post
      data = await this.postService.editOne(id, dto, author);
    }

    return { message: 'POst editado com sucesso', data };
  }

  @Auth({
    resource: AppResource.POST,
    action: 'delete',
    possession: 'own',
  })
  @Delete(':id')
  async deleteOne(@Param('id') id: number, @User() author: UserEntity) {
    let data;

    if (
      this.roleBuilder.can(author.roles).deleteAny(AppResource.POST).granted
    ) {
      data = await this.postService.deleteOne(id);
    } else {
      data = await this.postService.deleteOne(id, author);
    }
    return { message: 'Post deletado com sucesso', data };
  }
}
