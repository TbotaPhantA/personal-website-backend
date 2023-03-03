import { LanguageRepository } from './language.repository';
import { Language } from '../../../domain/language/language';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryLanguageRepository implements LanguageRepository {
  private languagesMap: Map<string, Language> = new Map<string, Language>();

  async findAll(): Promise<Language[]> {
    return Array.from(this.languagesMap.values());
  }

  async insert(language: Language): Promise<Language> {
    this.languagesMap.set(language.id, language);
    return language;
  }

  async update(language: Language): Promise<Language> {
    this.languagesMap.set(language.id, language);
    return language;
  }

  async findById(id: string): Promise<Language | undefined> {
    return this.languagesMap.get(id);
  }

  async findManyByIds(ids: string[]): Promise<Language[]> {
    return ids.map(id => this.languagesMap.get(id)).filter(Boolean) as Language[];
  }
}
