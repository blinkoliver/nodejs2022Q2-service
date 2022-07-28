import { Injectable } from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Album } from 'src/albums/entities/album.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoritesRepository: Repository<Favorite>,
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
  ) {}

  getFavorites = async () => {
    return this;
  };

  addTrack = async (trackId: string) => {
    // console.log('service', trackId);
    // const track = await this.tracksService.findOne(trackId);
    // if (track) {
    //   return FavoritesService.db.tracks.push(trackId);
    // } else {
    //   throw new UnprocessableEntityException();
    // }
  };
  addArtist = async (artistId: string) => {
    // const artist = await this.artistsService.findOne(artistId);
    // if (artist) {
    //   return FavoritesService.db.artist.push(artistId);
    // } else {
    //   throw new UnprocessableEntityException();
    // }
  };
  addAlbum = async (albumId: string) => {
    // const album = await this.albumsService.findOne(albumId);
    // if (album) {
    //   return FavoritesService.db.album.push(album);
    // } else {
    //   throw new UnprocessableEntityException();
    // }
  };

  deleteArtist = async (id: string) => {
    console.log(id);
  };

  deleteTrack = async (id: string) => {
    console.log(id);
  };

  deleteAlbum = (id: string) => {
    console.log(id);
  };
}
