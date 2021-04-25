import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Video } from "@/video.module/entity/video";
import { isNil } from "@/common.module/utls/type-extension";
import { VideoOutput } from "../dtos/video-output";
import { VideoUploadInput } from "../dtos/video-upload-input";

@Injectable()
export class VideoApplication {
  constructor(
    @InjectRepository(Video) private videoRepository: Repository<Video>
  ) { }


  async upload(input: VideoUploadInput): Promise<Video> {

    const entity = this.videoRepository.create({
      name: input.name,
      url: input.url,
      coverUrl: input.coverUrl,
      description: input.description,
      label: input.label,
      publisherId: "123"
    });
    return await this.videoRepository.save(entity);
  }

  async getVideo(id: string): Promise<VideoOutput> {

    const video = await this.videoRepository.findOne(id);

    if (isNil(video)) throw new NotFoundException("未找到视频");

    return {
      ...video,
      id: video.id.toString()
    };
  }
}
