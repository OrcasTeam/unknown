import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import * as config from 'config';
import { User } from '../entity/user';
import { JwtPayload } from '../interface/jwt-payload';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET || config.get<string>('jwt.secret'),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    console.log(`JWT验证 - Step 1234: 被守卫调用`);
    const { phone, password } = payload;
    const user = await this.userRepository.findOne({ phone, password });

    if (!user) {
      throw new UnauthorizedException('请登录');
    }

    return user;
  }
}
