import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

dotenv.config();

export default {
  type: 'postgres',
  host: (process.env.POSTGRES_HOST as string) || ('postgres-db' as string),
  port: parseInt(process.env.POSTGRES_PORT as string, 10) || 5352,
  username: (process.env.DB_USERNAME as string) || ('postgres' as string),
  password: (process.env.DB_PASSWORD as string) || ('postgres' as string),
  database: (process.env.POSTGRES_DB as string) || ('users' as string),
  entities: [__dirname + '/**/*.entity.ts', __dirname + '/**/*.entity.js'],
  migrationsRun: false,
  logging: true,
  synchronize: false,
  migrations: [
    __dirname + '/migration/**/*.ts',
    __dirname + '/migration/**/*.js',
  ],
} as DataSourceOptions;
