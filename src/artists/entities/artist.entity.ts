import { Album } from '../../albums/entities/album.entity';
import { Track } from '../../tracks/entities/track.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('artist')
export class Artist extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];

  toResponse() {
    const { id, name, grammy, albums, tracks } = this;
    return { id, name, grammy, albums, tracks };
  }
}
