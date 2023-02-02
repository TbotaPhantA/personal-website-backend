import { LanguageFromDto } from './shared/dto/languageFrom.dto';

export class Language {
  private readonly id: string;
  private readonly name: string;

  constructor(dto: LanguageFromDto) {
    this.id = dto.id;
    this.name = dto.name;
  }
}
