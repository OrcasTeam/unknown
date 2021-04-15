import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from '../dtos/register-user';
import { UserRepository } from '../repository/user.repository';
import { Encryption } from '../../common.module/helper/encryption';

@Injectable()
export class UserApplication {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async register(dto: RegisterUserDto): Promise<boolean> {
    if (await this.userRepository.findOne({ phone: dto.phone }))
      throw new ConflictException('当前手机号已注册');

    const user = await this.userRepository.insert({
      phone: dto.phone,
      password: Encryption.md5Encrypt(dto.password),
    });
    return !!user;
  }
}
