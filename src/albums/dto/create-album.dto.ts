import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  year: number;

  @IsString()
  @IsOptional()
  artistId: string | null;
}
