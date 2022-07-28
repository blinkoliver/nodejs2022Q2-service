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
      return (await this.albumRepository.save(createdAlbum)).toResponse();
    } catch (error) {
      throw new BadRequestException();
    }
  };

  findAll = async () => {
    const albums = await this.albumRepository.find();
    return albums.map((el) => el.toResponse());
  };

  findOne = async (id: string) => {
    const album = await this.albumRepository.findOne({ where: { id: id } });
    if (album) {
      return album.toResponse();
    } else {
      throw new NotFoundException('Album with this id not found');
    }
  };

  update = async (id: string, updateAlbumDto: UpdateAlbumDto) => {
    const updatedAlbum = await this.albumRepository.findOne({
      where: { id: id },
    });
    if (updatedAlbum) {
      Object.assign(updatedAlbum, updateAlbumDto);
      return await this.albumRepository.save(updatedAlbum);
    } else {
      throw new NotFoundException('Album with this id not found');
    }
  };

  remove = async (id: string) => {
    await this.findOne(id);
    await this.albumRepository.delete(id);
  };
}
