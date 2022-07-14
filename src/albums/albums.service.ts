import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DataBase } from 'src/database/database';
import { v4 } from 'uuid';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  private db: DataBase<Album>;

  constructor() {
    this.db = new DataBase<Album>(Album);
  }

  create(createAlbumDto: CreateAlbumDto) {
    const albumWithId = {
      id: v4(),
      ...createAlbumDto,
    };
    return this.db.create(albumWithId);
  }

  findAll() {
    return this.db.readAll();
  }

  findOne(id: string) {
    return this.db.read(id);
  }

  update = async (id: string, updateAlbumDto: UpdateAlbumDto) => {
    const album = await this.findOne(id);
    const updatedData = {
      ...album,
    };
    Object.keys(updateAlbumDto).forEach((el) => {
      updatedData[el] = updateAlbumDto[el];
    });
    return this.db.update(id, updatedData);
  };

  remove = async (id: string) => {
    await this.findOne(id);
    return this.db.delete(id);
  };
}
