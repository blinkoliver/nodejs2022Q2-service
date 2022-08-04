import {
  IsString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  IsNotEmpty,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  year: number;

  @IsUUID('4')
  @IsOptional()
  artistId: string | null;
}
