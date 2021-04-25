import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Encryption } from "@/common.module/utls/encryption";
import { UserOutput } from '../dtos/user.output';
import { RegisterUserInput } from '../dtos/register-user.input';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserApplication {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async register(dto: RegisterUserInput): Promise<UserOutput> {
    if (await this.userRepository.findOne({ phone: dto.phone }))
      throw new ConflictException('当前手机号已注册');

    const entity = this.userRepository.create({
      phone: dto.phone,
      password: Encryption.md5Encrypt(dto.password),
    })
    const user = await this.userRepository.save(entity);
    user.password = undefined;
    return {
      ...user,
      id: user.id.toString(),
    }
  }
}
