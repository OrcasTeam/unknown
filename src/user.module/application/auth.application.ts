import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repository/user.repository';
import { AuthCredentialsDto } from '../dtos/auth-credentials';
import { JwtPayload } from '../interface/jwt-payload';

@Injectable()
export class AuthApplication {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(dto: AuthCredentialsDto) {
    const user = await this.userRepository.validateUserPassword(dto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { phone: user.phone, password: user.password };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
