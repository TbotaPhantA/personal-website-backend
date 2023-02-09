import { Language } from '../../../language';
import { ApiProperty } from '@nestjs/swagger';

export class LanguageOutputDto {
  @ApiProperty({ example: 'en' })
  id: string;

  @ApiProperty({ example: 'English' })
  name: string;

  public static from(language: Language): LanguageOutputDto {
    const dto = new LanguageOutputDto();
    dto.id = language.id;
    dto.name = language.name;
    return dto;
  }
}
