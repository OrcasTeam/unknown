import { Controller } from '@nestjs/common';
import { UserApplication } from '../application/user.application';

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
  // @Post('/signin')
  // signIn(
  //   @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  // ): Promise<{ accessToken: string }> {
  //   return this.authService.signIn(authCredentialsDto);
  // }
}
