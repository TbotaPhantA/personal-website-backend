import { Language } from '../../../domain/language/language';
import { ITransaction } from '../../bookReview/shared/types/ITransaction';
import * as T from 'fp-ts/Task';

export interface LanguageRepository {
  findAll(): T.Task<Language[]>;
  insert(transaction: ITransaction): (language: Language) => T.Task<Language>;
  update(transaction: ITransaction): (language: Language) => T.Task<Language>;
  findById(id: string, transaction: ITransaction): T.Task<Language | undefined>;
  findManyByIds(ids: string[], transaction: ITransaction): T.Task<Language[]>;
}
