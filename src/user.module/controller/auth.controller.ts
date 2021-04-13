import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserApplication } from '../application/user.application';

@ApiTags('user')
@Controller('auth')
export class AuthController {
  constructor(private userApplication: UserApplication) {}

  // @Post('/signup')
  // signUp(
  //   @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  // ): Promise<void> {
  //   return this.authService.signUp(authCredentialsDto);
  // }
  //
  @Post('/signin')
  signIn(): { accessToken: string } {
    return { accessToken: '123' };
  }
}
