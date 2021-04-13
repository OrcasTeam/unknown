import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserApplication {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async create(): Promise<void> {
    await this.userRepository.insert({
      name: '张三',
      description: '这是张三',
      age: 123,
    });
  }
}
