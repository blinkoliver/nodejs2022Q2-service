import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  create = async (createArtistDto: CreateArtistDto) => {
    const createdArtist = this.artistRepository.create(createArtistDto);
    return (await this.artistRepository.save(createdArtist)).toResponse();
  };

  findAll = async () => {
    const artists = await this.artistRepository.find();
    return artists.map((el) => el.toResponse());
  };

  findOne = async (id: string) => {
    const artist = await this.artistRepository.findOne({ where: { id: id } });
    if (artist) {
      return artist.toResponse();
    } else {
      throw new NotFoundException('Artist with this id not found');
    }
  };

  update = async (id: string, updateArtistDto: UpdateArtistDto) => {
    const updatedArtist = await this.artistRepository.findOne({
      where: { id: id },
    });
    if (updatedArtist) {
      Object.assign(updatedArtist, updateArtistDto);
      return await this.artistRepository.save(updatedArtist);
    } else {
      throw new NotFoundException('Artist with this id not found');
    }
  };

  remove = async (id: string) => {
    const result = await this.artistRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Artist with this id not found');
    }
  };
}
