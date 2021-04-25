import { BaseOutputDto } from "@/video.module/dtos/video-output";

export class UserOutput extends BaseOutputDto{
  nickName: string;

  phone: string;

  description: string;

}
