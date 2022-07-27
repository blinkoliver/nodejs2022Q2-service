import { Injectable, NotFoundException } from '@nestjs/common';
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
    const createdTrack = this.trackRepository.create(createTrackDto);
    return (await this.trackRepository.save(createdTrack)).toResponse();
  };

  findAll = async () => {
    const tracks = await this.trackRepository.find();
    return tracks.map((el) => el.toResponse());
  };

  findOne = async (id: string) => {
    const track = await this.trackRepository.findOne({ where: { id: id } });
    if (track) {
      return track.toResponse();
    } else {
      throw new NotFoundException('Track with this id not found');
    }
  };

  update = async (id: string, updateTrackDto: UpdateTrackDto) => {
    const updatedTrack = await this.trackRepository.findOne({
      where: { id: id },
    });
    if (updatedTrack) {
      Object.assign(updatedTrack, updateTrackDto);
      return await this.trackRepository.save(updatedTrack);
    } else {
      throw new NotFoundException('Track with this id not found');
    }
  };

  remove = async (id: string) => {
    const result = await this.trackRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Track with this id not found');
    }
  };
}
