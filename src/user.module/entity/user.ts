import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;
  @Column({
    length: 20,
  })
  name: string;
  @Column()
  description: string;
  @Column()
  age: number;
  views: number;
}
