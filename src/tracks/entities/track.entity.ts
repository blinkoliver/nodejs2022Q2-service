import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Track extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  artistId: string | null;

  @Column({ type: 'varchar' })
  albumId: string | null;

  @Column({ type: 'varchar' })
  duration: number;

  toResponse() {
    const { id } = this;
    return { id };
  }
}
