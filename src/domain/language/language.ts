import { LanguageFormDto } from './shared/dto/languageForm.dto';

export class Language {
  readonly id: string;
  readonly name: string;

  constructor(dto: LanguageFormDto) {
    this.id = dto.id;
    this.name = dto.name;
  }
}
