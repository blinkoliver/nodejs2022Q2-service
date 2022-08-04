import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from '../orm-config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ormConfig,
      autoLoadEntities: true,
    }),
    UsersModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
    ArtistsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
