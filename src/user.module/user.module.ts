import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { UserApplication } from './application/user.application';
import { UserController } from './controller/user.controller';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UserController, AuthController],
  providers: [UserApplication],
})
export class UserModule {}
