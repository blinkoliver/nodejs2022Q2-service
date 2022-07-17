import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesService {
  private static db: any = {
    artists: [],
    albums: [],
    tracks: [],
  };
  getFavorites() {
    return this;
  }

  addTrack(track: any) {
    return track;
  }

  deleteTrack(id: string): void {
    console.log(id);
  }

  addAlbum(album: any) {
    return album;
  }

  deleteAlbum(id: string): void {
    console.log(id);
  }

  addArtist(artist: any) {
    console.log(artist);
  }

  deleteArtist(id: string): void {
    console.log(id);
  }
}
