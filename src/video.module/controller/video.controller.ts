import {
  Body,
  Controller, Get,
  HttpException,
  HttpStatus, Param,
  Post,
  UseGuards
} from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { VideoApplication } from '../application/video.application';
import { VideoUploadInput } from "@/video.module/dtos/video-upload-input";
import { VideoOutput } from "@/video.module/dtos/video-output";

@ApiBearerAuth()
@ApiTags('video')
@Controller('video')
export class VideoController {
  constructor(private videoApplication: VideoApplication) {}

  // @UseGuards(AuthGuard('jwt'))
  @Post('/upload')
  async upload( @Body() dto: VideoUploadInput) {
    return await this.videoApplication.upload(dto);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async getVideo(@Param('id') id: string): Promise<VideoOutput> {
    return await this.videoApplication.getVideo(id);
  }

  @Post('/error')
  error() {
    throw new HttpException('123123123', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
