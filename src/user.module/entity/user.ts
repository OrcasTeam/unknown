import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Encryption } from '../../common.module/helper/encryption';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;
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
