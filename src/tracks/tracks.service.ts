import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  create = async (createTrackDto: CreateTrackDto) => {
    try {
      const createdTrack = this.trackRepository.create(createTrackDto);
      return await this.trackRepository.save(createdTrack);
    } catch (error) {
      throw new BadRequestException();
    }
  };

  findAll = async () => {
    return await this.trackRepository.find();
  };

  findOne = async (id: string) => {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException('Track with this id not found');
    }
    return track;
  };

  update = async (id: string, updateTrackDto: UpdateTrackDto) => {
    await this.findOne(id);
    try {
      await this.trackRepository.update(id, updateTrackDto);
    } catch (error) {
      throw new BadRequestException('Invalid track data.');
    }
    return await this.findOne(id);
  };

  remove = async (id: string) => {
    await this.findOne(id);
    await this.trackRepository.delete(id);
  };
}
