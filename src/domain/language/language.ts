import { LanguageFormDto } from './shared/dto/form/languageForm.dto';

export class Language {
  readonly id: string;
  readonly name: string;

  constructor(dto: LanguageFormDto) {
    this.id = dto.id;
    this.name = dto.name;
  }
}
