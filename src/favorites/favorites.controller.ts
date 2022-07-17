import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

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
    return this.favoritesService.addTrack(id);
  }
  @Delete('track/:id')
  @HttpCode(204)
  deleteTrackFromFavorites(@Param('id') id: string) {
    return this.favoritesService.deleteTrack(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  addAlbumToFavorites(@Param('id') id: string) {
    return this.favoritesService.addAlbum(id);
  }
  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbumFromFavorites(@Param('id') id: string) {
    return this.favoritesService.deleteAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  addArtistToFavorites(@Param('id') id: string) {
    return this.favoritesService.addArtist(id);
  }
  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtistFromFavorites(@Param('id') id: string) {
    return this.favoritesService.deleteArtist(id);
  }
}
