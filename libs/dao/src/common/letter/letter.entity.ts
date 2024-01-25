import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../../base-time.entity';

@Entity()
export class Letter extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ type: 'longtext' })
  content: string;

  @Column()
  status: number;

  @Column()
  fromUser: number;

  @Column()
  toUser: number;
}
