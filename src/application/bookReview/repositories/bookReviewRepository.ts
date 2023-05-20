import { BookReview } from '../../../domain/bookReview/bookReview';
import { ITransaction } from '../shared/types/ITransaction';
import * as T from 'fp-ts/Task';

export interface BookReviewRepository {
  getAll(): T.Task<BookReview[]>;
  findById(id: string, transaction: ITransaction): T.Task<BookReview | undefined>;
  insert(transaction: ITransaction): (bookReview: BookReview) => T.Task<BookReview>;
  update(transaction: ITransaction): (bookReview: BookReview) => T.Task<BookReview>;
}
