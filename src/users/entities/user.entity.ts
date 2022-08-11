import { PetAd } from './../../pet-ads/entities/pet-ads.entity';
import {
  BeforeInsert,
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

export type UserType = 'user' | 'admin';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  confirmPassword: string;

  @Column({ type: 'enum', enum: ['user', 'admin'], default: 'user' })
  role: UserType;

  @OneToMany(() => PetAd, (petAd) => petAd.user)
  petAd: PetAd[];

  @BeforeInsert()
  async runBeforeInsert() {
    // if password and confirm password are not equal, then throw an error.
    if (this.password !== this.confirmPassword) {
      throw new BadRequestException('Passwords do not match.');
    }

    // hash the password.
    this.password = await bcrypt.hash(this.password, 10);
  }

  @AfterInsert()
  runAfterInsert() {
    // success message.
    console.log('User inserted successfully.');
  }
}
