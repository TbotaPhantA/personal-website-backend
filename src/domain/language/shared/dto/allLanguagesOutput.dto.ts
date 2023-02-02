import { LanguageOutputDto } from './languageOutput.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AllLanguagesOutputDto {
  @ApiProperty({ type: [LanguageOutputDto] })
  languages: LanguageOutputDto[];
}
