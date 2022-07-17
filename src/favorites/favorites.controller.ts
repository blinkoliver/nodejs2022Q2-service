import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { validate } from 'uuid';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  getAll() {
    return this.favoritesService.getFavorites();
  }

  @Post('track/:id')
  @HttpCode(201)
  addTrackToFavorites(@Param('id') id: string) {
    if (validate(id)) {
      return this.favoritesService.addTrack(id);
    } else {
      throw new BadRequestException();
    }
  }
  @Delete('track/:id')
  @HttpCode(204)
  deleteTrackFromFavorites(@Param('id') id: string) {
    if (validate(id)) {
      return this.favoritesService.deleteTrack(id);
    } else {
      throw new BadRequestException();
    }
  }

  @Post('album/:id')
  @HttpCode(201)
  addAlbumToFavorites(@Param('id') id: string) {
    if (validate(id)) {
      return this.favoritesService.addAlbum(id);
    } else {
      throw new BadRequestException();
    }
  }
  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbumFromFavorites(@Param('id') id: string) {
    if (validate(id)) {
      return this.favoritesService.deleteAlbum(id);
    } else {
      throw new BadRequestException();
    }
  }

  @Post('artist/:id')
  @HttpCode(201)
  addArtistToFavorites(@Param('id') id: string) {
    if (validate(id)) {
      return this.favoritesService.addArtist(id);
    } else {
      throw new BadRequestException();
    }
  }
  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtistFromFavorites(@Param('id') id: string) {
    if (validate(id)) {
      return this.favoritesService.deleteArtist(id);
    } else {
      throw new BadRequestException();
    }
  }
}
