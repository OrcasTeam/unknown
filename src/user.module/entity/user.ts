import {
  Column, CreateDateColumn, DeleteDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn
} from "typeorm";
import { Encryption } from "@/common.module/utls/encryption";

@Entity()
export abstract class BaseEntity{
  @ObjectIdColumn()
  id!: ObjectID;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;


  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
}

@Entity()
export class User extends BaseEntity{
  @Column({ length: 20 })
  nickName: string;

  @Column({ length: 11, unique: true })
  phone: string;

  @Column({ length: 32 })
  password: string;

  @Column()
  description: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await Encryption.md5Encrypt(password);
    return hash === this.password;
  }
}
