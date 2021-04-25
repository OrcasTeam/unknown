import { EntityRepository, Repository } from 'typeorm';
import { Video } from "@/video.module/entity/video";

@EntityRepository(Video)
export class VideoRepository extends Repository<Video> {
}
