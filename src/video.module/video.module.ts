import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoController } from './controller/video.controller';
import { VideoApplication } from './application/video.application';
import { VideoRepository } from "./repository/video.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([VideoRepository]),
  ],
  controllers: [VideoController],
  providers: [VideoApplication],
})
export class VideoModule {}
