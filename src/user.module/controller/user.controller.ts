import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserOutput } from "../dtos/user.output";
import { UserApplication } from '../application/user.application';
import { RegisterUserInput } from '../dtos/register-user.input';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userApplication: UserApplication) {}

  @Post('register')
  async register(@Body(ValidationPipe) dto: RegisterUserInput): Promise<UserOutput> {
    return await this.userApplication.register(dto);
  }
}
