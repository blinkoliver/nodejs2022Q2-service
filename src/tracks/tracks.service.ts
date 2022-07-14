import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DataBase } from 'src/database/database';
import { v4 } from 'uuid';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  private db: DataBase<Track>;

  constructor() {
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
    return this.db.delete(id);
  };
}
