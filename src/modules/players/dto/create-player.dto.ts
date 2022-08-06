import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
} from 'class-validator';
import { Devise } from '../entities/player.entity';
export class CreatePlayerDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsDefined()
  @IsNotEmpty()
  lastname: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  goal: number;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  salary: number;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsEnum(Devise)
  devise: Devise;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  pictureURl: string;
}
