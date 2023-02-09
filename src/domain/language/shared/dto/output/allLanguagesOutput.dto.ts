import { LanguageOutputDto } from './languageOutput.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Language } from '../../../language';

export class AllLanguagesOutputDto {
  @ApiProperty({ type: [LanguageOutputDto] })
  languages: LanguageOutputDto[];

  public static from(languages: Language[]): AllLanguagesOutputDto {
    const dto = new AllLanguagesOutputDto();
    dto.languages = languages.map((l) => LanguageOutputDto.from(l));
    return dto;
  }
}
