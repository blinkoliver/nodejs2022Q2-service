import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Album } from './albums/entities/album.entity';
import { Artist } from './artists/entities/artist.entity';
import { Favorites } from './favorites/entities/favorite.entity';
import { Track } from './tracks/entities/track.entity';
import { User } from './users/entities/user.entity';

dotenv.config();

export const appDataSource = new DataSource({
  type: 'postgres',
  host: (process.env.POSTGRES_HOST as string) || ('postgres-db' as string),
  port: parseInt(process.env.POSTGRES_PORT as string, 10) || 5352,
  username: (process.env.POSTGRES_USER as string) || ('postgres' as string),
  password: (process.env.POSTGRES_PASSWORD as string) || ('postgres' as string),
  database: (process.env.POSTGRES_DB as string) || ('users' as string),
  entities: [User, Album, Artist, Track, Favorites],
  migrationsRun: false,
  logging: true,
  synchronize: false,
  subscribers: [],
  migrations: ['dist/migration/**/*.js'],
});
