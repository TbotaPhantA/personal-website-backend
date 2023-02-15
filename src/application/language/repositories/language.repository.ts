import { Language } from '../../../domain/language/language';

export interface LanguageRepository {
  findAll(): Promise<Language[]>;
  save(language: Language): Promise<Language>;
  doLanguagesExist(languages: string[]): Promise<boolean>;
  doesLanguageExist(languageId: string): Promise<boolean>;
}
