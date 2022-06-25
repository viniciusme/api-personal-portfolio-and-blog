import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  getMany() {
    return { ok: 'getMany' };
  }

  getOne(id: number) {
    return { ok: 'getOne' };
  }

  createOne() {
    return { ok: 'createOne' };
  }

  editOne(id: number) {
    return { ok: 'editOne' };
  }

  deleteOne(id: number) {
    return { ok: 'deleteOne' };
  }
}
