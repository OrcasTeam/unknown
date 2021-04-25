import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthCredentialsInput } from '../dtos/auth-credentials.input';
import { AuthApplication } from '../application/auth.application';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authApplication: AuthApplication) {}

  // @Post('/signup')
  // signUp(
  //   @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  // ): Promise<void> {
  //   return this.authService.signUp(authCredentialsDto);
  // }
  //
  //
  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) dto: AuthCredentialsInput,
  ): Promise<{ accessToken: string }> {
    return this.authApplication.signIn(dto);
  }
}
