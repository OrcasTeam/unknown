import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserApplication } from '../application/user.application';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userApplication: UserApplication) {}

  @Get('test')
  async test(): Promise<string> {
    await this.userApplication.create();
    return 'auth controller test';
  }
}
