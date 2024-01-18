import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../../base-time.entity';

@Entity()
export class Friend extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  friendId: number;

  @Column()
  process: number;

  constructor(partial?: Partial<Friend>) {
    super();
    Object.assign(this, partial);
  }
}
