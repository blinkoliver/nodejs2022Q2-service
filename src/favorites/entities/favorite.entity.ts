import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
export class Favorite extends BaseEntity {
  @Column({ type: 'varchar' })
  artists: string[];

  @Column({ type: 'varchar' })
  albums: string[];

  @Column({ type: 'varchar' })
  tracks: string[];
}
