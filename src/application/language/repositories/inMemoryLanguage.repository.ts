import { LanguageRepository } from './language.repository';
import { Language } from '../../../domain/language/language';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryLanguageRepository implements LanguageRepository {
  private languagesMap: Map<string, Language>;

  async save(language: Language): Promise<Language> {
    this.languagesMap.set(language.id, language);
    return language;
  }
}
