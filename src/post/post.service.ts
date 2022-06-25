import { Injectable } from '@nestjs/common';
import { CreatePostDto, EditPostDto } from './dtos';

@Injectable()
export class PostService {
  getMany() {
    return { ok: 'getMany' };
  }

  getOne(id: number) {
    return { ok: 'getOne' };
  }

  createOne(dto: CreatePostDto) {
    return { ok: 'createOne' };
  }

  editOne(id: number, dto: EditPostDto) {
    return { ok: 'editOne' };
  }

  deleteOne(id: number) {
    return { ok: 'deleteOne' };
  }
}
