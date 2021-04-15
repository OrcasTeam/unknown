import { Module } from '@nestjs/common';
import { VideoController } from './controller/video.controller';
import { VideoApplication } from './application/video.application';

@Module({
  //imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [VideoController],
  providers: [VideoApplication],
})
export class VideoModule {}
