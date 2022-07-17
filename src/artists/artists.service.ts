import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DataBase } from 'src/database/database';
import { v4 } from 'uuid';
import { Artist } from './entities/artist.entity';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { FavoritesService } from 'src/favorites/favorites.service';
@Injectable()
export class ArtistsService {
  private db: DataBase<Artist>;

  constructor(
    @Inject(forwardRef(() => TracksService))
    private trackService: TracksService,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
    @Inject(forwardRef(() => AlbumsService))
    private favoritesService: FavoritesService,
  ) {
    this.db = new DataBase<Artist>(Artist);
  }

  create(createArtistDto: CreateArtistDto) {
    const artistWithId = {
      id: v4(),
      ...createArtistDto,
    };
    return this.db.create(artistWithId);
  }

  findAll() {
    return this.db.readAll();
  }

  findOne(id: string) {
    return this.db.read(id);
  }

  update = async (id: string, updateArtistDto: UpdateArtistDto) => {
    const track = await this.findOne(id);
    const updatedData = {
      ...track,
    };
    Object.keys(updateArtistDto).forEach((el) => {
      updatedData[el] = updateArtistDto[el];
    });
    return this.db.update(id, updatedData);
  };

  remove = async (id: string) => {
    await this.findOne(id);
    // this.favoritesService.deleteArtist(id);
    return this.db.delete(id);
  };
}
