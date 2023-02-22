import { BookReview } from '../../../domain/bookReview/bookReview';
import { ITransaction } from '../shared/types/ITransaction';

/**
 * TODO
 * - think about how to make entity fields private
 * - save to postgreSQL
 * - create transaction services
 */
export interface BookReviewRepository {
  getAll(): Promise<BookReview[]>;
  findById(id: string, transaction: ITransaction): Promise<BookReview | undefined>;
  save(bookReview: BookReview, transaction: ITransaction): Promise<BookReview>;
}
