import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { VideoApplication } from '../application/video.application';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('video')
@Controller('video')
export class VideoController {
  constructor(private userApplication: VideoApplication) {}

  // @Post('/signup')
  // signUp(
  //   @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  // ): Promise<void> {
  //   return this.authService.signUp(authCredentialsDto);
  // }
  //
  @Post('/test')
  video(): { accessToken: string } {
    return { accessToken: '123' };
  }
}
