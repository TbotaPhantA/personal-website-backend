import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateLanguageInputDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  code: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 32)
  name: string;
}
