import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsUUID,
  IsInt,
  IsPositive,
} from 'class-validator';
export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @IsUUID()
  @IsOptional()
  albumId: string | null;

  @IsInt()
  @IsPositive()
  duration: number;
}
