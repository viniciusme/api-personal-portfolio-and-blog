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

  async getOne(id: number, userEntity?: User) {
    const user = await this.userRepository
      .findOne({ where: { id } })
      .then((u) =>
        !userEntity ? u : !!u && userEntity.id === u.id ? u : null,
      );

    if (!user)
      throw new NotFoundException('User does not exists or unauthorized');

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

  async editOne(id: number, dto: EditUserDto, userEntity?: User) {
    console.log(dto);
    const user = await this.getOne(id, userEntity);
    const editedUser = Object.assign(user, dto);

    // Aqui estamos removendo a senha para que ela não seja enviado no return
    const newEditedUser = await this.userRepository.save(editedUser);
    delete newEditedUser.password;

    return newEditedUser;
  }

  async deleteOne(id: number, userEntity?: User) {
    const user = await this.getOne(id, userEntity);
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
