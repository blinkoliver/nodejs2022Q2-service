import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DataBase } from 'src/database/database';
import { v4 } from 'uuid';
import { Artist } from './entities/artist.entity';
@Injectable()
export class ArtistsService {
  private db: DataBase<Artist>;

  constructor() {
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
    return this.db.delete(id);
  };
}
