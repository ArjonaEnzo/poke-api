import {
  IsString,
  IsNumber,
  IsUrl,
  IsOptional,
  Min,
  Max,
} from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  @Min(1)
  @Max(500)
  attack: number;

  @IsNumber()
  @Min(1)
  @Max(500)
  defense: number;

  @IsNumber()
  @Min(1)
  @Max(500)
  hp: number;

  @IsNumber()
  @Min(1)
  @Max(500)
  speed: number;

  @IsString()
  type: string;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;
}
