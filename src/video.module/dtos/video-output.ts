import { BaseEntity } from "@/user.module/entity/user";
import { CreateDateColumn, DeleteDateColumn, ObjectID, ObjectIdColumn, UpdateDateColumn } from "typeorm";

export class BaseOutputDto {
  id!: string;

  createdAt!: Date;

  updatedAt?: Date;
}

export class VideoOutput extends BaseOutputDto{

  name: string;

  url: string;


  coverUrl: string;

  label: Array<ObjectID>;

  publisherId: ObjectID;

  description: string;


}
