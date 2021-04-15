import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserApplication } from '../application/user.application';
import { RegisterUserDto } from '../dtos/register-user';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userApplication: UserApplication) {}

  @Post('register')
  async register(@Body(ValidationPipe) dto: RegisterUserDto): Promise<boolean> {
    return await this.userApplication.register(dto);
  }
}
