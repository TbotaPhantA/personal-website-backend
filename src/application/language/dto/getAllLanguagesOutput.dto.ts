import { LanguageOutputDto } from '../../../domain/language/shared/dto/languageOutput.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllLanguagesOutputDto {
  @ApiProperty({ type: [LanguageOutputDto] })
  languages: LanguageOutputDto[];
}
