import { LanguageRepository } from './language.repository';
import { Language } from '../../../domain/language/language';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryLanguageRepository implements LanguageRepository {
  private languagesMap: Map<string, Language> = new Map<string, Language>();

  async findAll(): Promise<Language[]> {
    return Array.from(this.languagesMap.values());
  }

  async save(language: Language): Promise<Language> {
    this.languagesMap.set(language.id, language);
    return language;
  }
}
