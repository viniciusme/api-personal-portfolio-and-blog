import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto, EditUserDto } from '../user/dtos';
import { User } from './entities';

export interface UserFindOne {
  id?: number;
  email?: string;
}

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
    const userExist = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (userExist)
      throw new BadRequestException('Usuário já cadastrado com esse e-mail');

    const newUser = this.userRepository.create(dto);
    const user = await this.userRepository.save(newUser);

    delete user.password;

    return user;
  }

  async editOne(id: number, dto: EditUserDto) {
    // const user = await this.userRepository.findOne({ where: { id } });
    // if (!user) throw new NotFoundException('Usuário não existe.'); //Este código foi refatorado, novo código está na primeira linha logo abaixo
    const user = await this.getOne(id);

    const editedUser = Object.assign(user, dto);

    const newEditedUser = await this.userRepository.save(editedUser);

    delete newEditedUser.password;

    return newEditedUser;
  }

  async deleteOne(id: number) {
    const user = await this.getOne(id);

    return await this.userRepository.remove(user);
  }

  async findOne(data: UserFindOne) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where(data)
      .addSelect('user.password')
      .getOne();
  }
}
