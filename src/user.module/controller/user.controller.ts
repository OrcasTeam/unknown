import { Controller, Get } from '@nestjs/common';
import { UserApplication } from '../application/user.application';

@Controller('user')
export class UserController {
  constructor(private userApplication: UserApplication) {}

  @Get('test')
  async test(): Promise<string> {
    await this.userApplication.create();
    return 'auth controller test';
  }
}
