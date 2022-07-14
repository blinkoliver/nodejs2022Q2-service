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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { validate } from 'uuid';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    if (validate(id)) {
      return this.artistsService.findOne(id);
    } else {
      throw new BadRequestException();
    }
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    if (validate(id)) {
      return this.artistsService.update(id, updateArtistDto);
    } else {
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (validate(id)) {
      return this.artistsService.remove(id);
    } else {
      throw new BadRequestException();
    }
  }
}
