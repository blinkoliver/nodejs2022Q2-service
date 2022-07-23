import {
  Injectable,
  UnprocessableEntityException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { TracksService } from 'src/tracks/tracks.service';
import { ArtistsService } from 'src/artists/artists.service';
import { AlbumsService } from 'src/albums/albums.service';
@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
  ) {}
  private static db: any = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getFavorites() {
    return this;
  }

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

  deleteArtist(id: string): void {
    console.log(id);
  }

  deleteTrack(id: string): void {
    console.log(id);
  }

  deleteAlbum(id: string): void {
    console.log(id);
  }
}
