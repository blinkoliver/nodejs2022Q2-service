import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  create = async (createAlbumDto: CreateAlbumDto) => {
    try {
      const createdAlbum = this.albumRepository.create(createAlbumDto);
      return await this.albumRepository.save(createdAlbum);
    } catch (error) {
      throw new BadRequestException();
    }
  };

  findAll = async () => {
    return await this.albumRepository.find();
  };

  findOne = async (id: string) => {
    const album = await this.albumRepository.findOne({ where: { id: id } });
    if (album) {
      return album;
    } else {
      throw new NotFoundException('Album with this id not found');
    }
  };

  update = async (id: string, updateAlbumDto: UpdateAlbumDto) => {
    await this.findOne(id);

    try {
      await this.albumRepository.update(id, updateAlbumDto);
    } catch (error) {
      throw new BadRequestException('Invalid album data.');
    }

    return await this.findOne(id);
  };

  remove = async (id: string) => {
    await this.findOne(id);
    await this.albumRepository.delete(id);
  };
}
