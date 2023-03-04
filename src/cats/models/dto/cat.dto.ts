import {Expose} from 'class-transformer';
import {IsString, IsInt, IsNotEmpty} from 'class-validator';

export class CatDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsNotEmpty()
  @IsInt()
  age: number;

  @Expose()
  @IsNotEmpty()
  @IsString()
  breed: string;
}
