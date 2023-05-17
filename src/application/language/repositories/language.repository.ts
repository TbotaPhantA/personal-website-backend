import { Language } from '../../../domain/language/language';
import { ITransaction } from '../../bookReview/shared/types/ITransaction';
import * as T from 'fp-ts/Task';

export interface LanguageRepository {
  findAll(): T.Task<Language[]>;
  insert(language: Language, transaction: ITransaction): T.Task<Language>;
  update(language: Language, transaction: ITransaction): T.Task<Language>;
  findById(id: string, transaction: ITransaction): T.Task<Language | undefined>;
  findManyByIds(ids: string[], transaction: ITransaction): T.Task<Language[]>;
}
