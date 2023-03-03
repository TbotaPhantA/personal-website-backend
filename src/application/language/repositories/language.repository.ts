import { Language } from '../../../domain/language/language';
import { ITransaction } from '../../bookReview/shared/types/ITransaction';

export interface LanguageRepository {
  findAll(): Promise<Language[]>;
  insert(language: Language, transaction: ITransaction): Promise<Language>;
  update(language: Language, transaction: ITransaction): Promise<Language>;
  findById(id: string, transaction: ITransaction): Promise<Language | undefined>;
  findManyByIds(ids: string[], transaction: ITransaction): Promise<Language[]>;
}
