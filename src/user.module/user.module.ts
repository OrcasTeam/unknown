import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import * as config from 'config';
import { JwtStrategy } from './strategy/jwt-strategy';
import { UserRepository } from './repository/user.repository';
import { UserApplication } from './application/user.application';
import { AuthApplication } from './application/auth.application';
import { UserController } from './controller/user.controller';
import { AuthController } from './controller/auth.controller';

const jwtConfig = config.get('jwt');
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule,
  ],
  controllers: [UserController, AuthController],
  providers: [UserApplication, AuthApplication, JwtStrategy],
})
export class UserModule {}
