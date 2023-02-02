import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';

export class LanguageFormDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  @ApiProperty({ example: 'en' })
  id: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @ApiProperty({ example: 'English' })
  name: string;
}
