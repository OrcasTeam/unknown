import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { VideoApplication } from '../application/video.application';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('video')
@Controller('video')
export class VideoController {
  constructor(private videoApplication: VideoApplication) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/test')
  video(): { accessToken: string } {
    return { accessToken: '123' };
  }

  @Post('/error')
  error() {
    throw new HttpException('123123123', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
