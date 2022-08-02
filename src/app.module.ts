import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appDataSource } from './typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
    ArtistsModule,
    TypeOrmModule.forRoot(appDataSource.options),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
