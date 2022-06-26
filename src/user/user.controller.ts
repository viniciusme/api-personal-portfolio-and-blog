import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getMany() {
    return await this.userService.getMany();
  }

  @Get(':id')
  async getOne() {
    // return await this.userService.getOne();
  }

  @Post()
  createOne() {}

  @Put(':id')
  editOne() {}

  @Delete(':id')
  delete() {}
}
