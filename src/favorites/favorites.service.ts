import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Favorites } from './entities/favorite.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Album } from 'src/albums/entities/album.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private readonly favoritesRepository: Repository<Favorites>,
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
  ) {}

  private isExist = (items: any[], itemId: string): boolean => {
    const index: number = items.findIndex((el) => el.id === itemId);
    return index >= 0;
  };

  getFavorites = async () => {
    const favorites = await this.favoritesRepository.find();
    return favorites.find(() => true);
  };

  addTrack = async (id: string) => {
    const favorites = await this.getFavorites();
    const track: Track | null = await this.tracksRepository.findOneBy({
      id: id,
    });
    if (!track) {
      throw new UnprocessableEntityException(`Track not found.`);
    }
    if (!this.isExist(favorites.tracks, id)) {
      favorites.tracks.push(track);
    }
    await this.favoritesRepository.save(favorites);
    return { result: `Track was added to favorites.` };
  };

  addArtist = async (id: string) => {
    const favorites = await this.getFavorites();
    const artist: Artist | null = await this.artistsRepository.findOneBy({
      id: id,
    });
    if (!artist) {
      throw new UnprocessableEntityException(`Artist ${id} not found.`);
    }
    if (!this.isExist(favorites.artists, id)) {
      favorites.artists.push(artist);
    }
    await this.favoritesRepository.save(favorites);
    return { result: `Artist was added to favorites.` };
  };

  addAlbum = async (id: string) => {
    const favorites = await this.getFavorites();
    const album: Album | null = await this.albumsRepository.findOneBy({
      id: id,
    });
    if (!album) {
      throw new UnprocessableEntityException(`Album ${id} not found.`);
    }
    if (!this.isExist(favorites.albums, id)) {
      favorites.albums.push(album);
    }
    await this.favoritesRepository.save(favorites);
    return { result: `Album  was added to favorites.` };
  };

  deleteArtist = async (id: string) => {
    const favorites = await this.getFavorites();
    if (!this.isExist(favorites.artists, id)) {
      throw new NotFoundException(`Artist was not in favorites.`);
    }
    favorites.artists = favorites.artists.filter((artist: Artist) => {
      return artist.id !== id;
    });
    await this.favoritesRepository.save(favorites);
  };

  deleteTrack = async (id: string) => {
    const favorites = await this.getFavorites();
    if (!this.isExist(favorites.tracks, id)) {
      throw new NotFoundException(`Track was not in favorites.`);
    }
    favorites.tracks = favorites.tracks.filter((track: Track) => {
      return track.id !== id;
    });
    await this.favoritesRepository.save(favorites);
  };

  deleteAlbum = async (id: string) => {
    const favorites = await this.getFavorites();
    if (!this.isExist(favorites.albums, id)) {
      throw new NotFoundException(`Album was not in favorites.`);
    }
    favorites.albums = favorites.albums.filter((album: Album) => {
      return album.id !== id;
    });
    await this.favoritesRepository.save(favorites);
  };
}
