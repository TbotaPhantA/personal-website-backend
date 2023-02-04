import { BookReview } from '../../../domain/bookReview/bookReview';

export interface BookReviewRepository {
  getAll(): Promise<BookReview[]>;
  save(bookReview: BookReview): Promise<BookReview>;
}
