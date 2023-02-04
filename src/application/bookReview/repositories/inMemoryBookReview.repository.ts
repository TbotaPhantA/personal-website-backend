import { BookReviewRepository } from './BookReviewRepository';
import { BookReview } from '../../../domain/bookReview/bookReview';

export class InMemoryBookReviewRepository implements BookReviewRepository {
  private readonly bookReviewsMap: Map<string, BookReview> = new Map<
    string,
    BookReview
  >();

  public async save(bookReview: BookReview): Promise<BookReview> {
    this.bookReviewsMap.set(bookReview.id, bookReview);
    return bookReview;
  }
}
