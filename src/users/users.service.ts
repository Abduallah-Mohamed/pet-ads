import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);

    if (!user) {
      return new NotFoundException('User not found');
    }

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  // find user by id
  findOne(id: number) {
    return this.userRepository.findBy({ id });
  }

  // find user by email
  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.userRepository.findBy({ id });

    if (!user) {
      return new NotFoundException('User not found');
    }

    return this.userRepository.save({ ...user, ...updateUserDto });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
