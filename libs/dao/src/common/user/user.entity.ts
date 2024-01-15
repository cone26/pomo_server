import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../../../base-time.entity';

@Entity({
  database: process.env.DB_COMMON_NAME,
})
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  nickName: string;

  constructor(partial?: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
