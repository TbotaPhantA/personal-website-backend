import { BookReview } from '../../../domain/bookReview/bookReview';

/**
 * TODO
 * - think about how to make entity fields private
 * - save to postgreSQL
 * - create transaction services
 */
export interface BookReviewRepository {
  getAll(): Promise<BookReview[]>;
  findById(id: string): Promise<BookReview | undefined>;
  save(bookReview: BookReview): Promise<BookReview>;
}
