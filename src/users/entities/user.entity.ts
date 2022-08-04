import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Exclude, Type } from 'class-transformer';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  @Type(() => Number)
  createdAt: number;

  @UpdateDateColumn()
  @Type(() => Number)
  updatedAt: number;
}
