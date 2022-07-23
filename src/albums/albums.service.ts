import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DataBase } from 'src/database/database';
import { v4 } from 'uuid';
import { Album } from './entities/album.entity';
import { TracksService } from 'src/tracks/tracks.service';
import { ArtistsService } from 'src/artists/artists.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class AlbumsService {
  private db: DataBase<Album>;

  constructor(
    @Inject(forwardRef(() => TracksService))
    private tracksServices: TracksService,
    @Inject(forwardRef(() => ArtistsService))
    private artistsServices: ArtistsService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesServices: FavoritesService,
  ) {
    this.db = new DataBase<Album>(Album);
  }

  create(createAlbumDto: CreateAlbumDto) {
    // return this.db.create();
  }

  findAll() {
    return this.db.readAll();
  }

  findOne(id: string) {
    return this.db.read(id);
  }

  update = async (id: string, updateAlbumDto: UpdateAlbumDto) => {
    // const album = await this.findOne(id);
    // const updatedData = {
    //   ...album,
    // };
    // Object.keys(updateAlbumDto).forEach((el) => {
    //   updatedData[el] = updateAlbumDto[el];
    // });
    // return this.db.update(id, updatedData);
  };

  remove = async (id: string) => {
    // await this.findOne(id);
    // // this.favoritesServices.deleteAlbum(id);
    // return this.db.delete(id);
  };
}
