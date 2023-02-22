import { Language } from '../../../domain/language/language';
import { ITransaction } from '../../bookReview/shared/types/ITransaction';

export interface LanguageRepository {
  findAll(): Promise<Language[]>;
  save(language: Language, transaction: ITransaction): Promise<Language>;
  doLanguagesExist(languages: string[], transaction: ITransaction): Promise<boolean>;
  isLanguageIdUnique(languageId: string, transaction: ITransaction): Promise<boolean>;
}
