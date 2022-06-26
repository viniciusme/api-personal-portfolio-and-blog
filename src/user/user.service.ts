import { CreateUserDto } from './dtos/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getMany() {
    return await this.userRepository.find();
  }

  async getOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException('Usuário não existe.');

    return user;
  }

  async createOne(dto: CreateUserDto) {
    const newUser = this.userRepository.create(dto);

    return await this.userRepository.save(newUser);
  }

  async editOne() {}

  async deleteOne() {}
}
