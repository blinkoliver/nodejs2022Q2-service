import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DataBase } from 'src/database/database';
import { v4 } from 'uuid';
import { Track } from './entities/track.entity';
import { ArtistsService } from 'src/artists/artists.service';
import { AlbumsService } from 'src/albums/albums.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class TracksService {
  private db: DataBase<Track>;

  constructor(
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {
    this.db = new DataBase<Track>(Track);
  }

  create = (createTrackDto: CreateTrackDto) => {
    const trackWithId = {
      id: v4(),
      ...createTrackDto,
    };
    return this.db.create(trackWithId);
  };

  findAll = () => {
    return this.db.readAll();
  };

  findOne = (id: string) => {
    console.log('trackservice', id);
    return this.db.read(id);
  };

  update = async (id: string, updateTrackDto: UpdateTrackDto) => {
    const track = await this.findOne(id);
    const updatedData = {
      ...track,
    };
    Object.keys(updateTrackDto).forEach((el) => {
      updatedData[el] = updateTrackDto[el];
    });
    return this.db.update(id, updatedData);
  };

  remove = async (id: string) => {
    await this.findOne(id);
    // this.favoritesService.deleteTrack(id);
    return this.db.delete(id);
  };
}
