import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favorites')
export class Favorite extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @Column({ type: 'varchar' })
  artists: string[];

  @Column({ type: 'varchar' })
  albums: string[];

  @Column({ type: 'varchar' })
  tracks: string[];
}
