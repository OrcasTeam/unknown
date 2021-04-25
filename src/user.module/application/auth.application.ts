import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repository/user.repository';
import { AuthCredentialsInput } from '../dtos/auth-credentials.input';
import { JwtPayload } from '../interface/jwt-payload';
import { isNil } from '@/common.module/utls/type-extension';

@Injectable()
export class AuthApplication {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signIn(dto: AuthCredentialsInput) {
    const user = await this.userRepository.validateUserPassword(dto);
    if (isNil(user)) throw new UnauthorizedException("Invalid credentials");
    const payload: JwtPayload = { phone: user.phone, password: user.password };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
