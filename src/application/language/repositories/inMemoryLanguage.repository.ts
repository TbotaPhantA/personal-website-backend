import { LanguageRepository } from './language.repository';
import { Language } from '../../../domain/language/language';
import { Injectable } from '@nestjs/common';
import * as T from 'fp-ts/Task';

@Injectable()
export class InMemoryLanguageRepository implements LanguageRepository {
  private languagesMap: Map<string, Language> = new Map<string, Language>();

  findAll(): T.Task<Language[]> {
    return async () => Array.from(this.languagesMap.values());
  }

  insert(language: Language): T.Task<Language> {
    return async () => {
      this.languagesMap.set(language.id, language);
      return language;
    }
  }

  update(language: Language): T.Task<Language> {
    return async () => {
      this.languagesMap.set(language.id, language);
      return language;
    }
  }

  findById(id: string): T.Task<Language | undefined> {
    return async () => this.languagesMap.get(id);
  }

  findManyByIds(ids: string[]): T.Task<Language[]> {
    return async () => ids.map(id => this.languagesMap.get(id)).filter(Boolean) as Language[];
  }
}
