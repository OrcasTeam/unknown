import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthCredentialsDto } from '../dtos/auth-credentials';
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
    @Body(ValidationPipe) dto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authApplication.signIn(dto);
  }
}
