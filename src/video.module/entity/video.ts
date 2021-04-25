import { BeforeInsert, Column, Entity, ObjectID } from "typeorm";
import { BaseEntity } from "@/user.module/entity/user";

@Entity()
export class Video extends BaseEntity {

  @Column({ length: 20 })
  name: string;

  @Column({ unique: true})
  url: string;


  @Column()
  coverUrl: string;

  @Column()
  label: Array<ObjectID>;


  @Column({ type: 'string' })
  publisherId: ObjectID;

  @Column()
  description: string;
}
