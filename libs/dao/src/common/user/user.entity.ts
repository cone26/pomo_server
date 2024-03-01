import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../../base-time.entity';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from "@nestjs/swagger";
@Entity()
export class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  socialProvider: string;

  @Column()
  externalId: string;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;


  constructor(partial?: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  // @BeforeInsert()
  // async hashPassword(): Promise<void> {
  //   try {
  //     this.password = await bcrypt.hash(this.password, 10);
  //   } catch (e) {
  //     throw new InternalServerErrorException(e);
  //   }
  // }

  // async checkPassword(password: string): Promise<boolean> {
  //   try {
  //     return await bcrypt.compare(password, this.password);
  //   } catch (e) {
  //     throw new InternalServerErrorException(e);
  //   }
  // }
}
