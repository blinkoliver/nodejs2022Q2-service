import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { validate } from 'uuid';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    if (validate(id)) {
      return this.albumsService.findOne(id);
    } else {
      throw new BadRequestException();
    }
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    if (validate(id)) {
      return this.albumsService.update(id, updateAlbumDto);
    } else {
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (validate(id)) {
      return this.albumsService.remove(id);
    } else {
      throw new BadRequestException();
    }
  }
}
