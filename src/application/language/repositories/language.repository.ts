import { Language } from '../../../domain/language/language';

export interface LanguageRepository {
  save(language: Language): Promise<Language>;
}
