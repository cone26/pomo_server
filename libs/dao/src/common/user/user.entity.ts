import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../../../base-time.entity';

@Entity()
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickName: string;

  @Column({ type: 'tinyint' })
  gameDbId: number;

  constructor(partial?: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
