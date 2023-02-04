import { BookReview } from '../../../domain/bookReview/bookReview';

export interface BookReviewRepository {
  save(bookReview: BookReview): Promise<BookReview>;
}
