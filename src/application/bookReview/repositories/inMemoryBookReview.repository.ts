import { BookReviewRepository } from './bookReviewRepository';
import { BookReview } from '../../../domain/bookReview/bookReview';

export class InMemoryBookReviewRepository implements BookReviewRepository {
  private readonly bookReviewsMap: Map<string, BookReview> = new Map<
    string,
    BookReview
  >();

  public async getAll(): Promise<BookReview[]> {
    return Array.from(this.bookReviewsMap.values());
  }

  public async findById(id: string): Promise<BookReview | undefined> {
    return this.bookReviewsMap.get(id);
  }

  public async insert(bookReview: BookReview): Promise<BookReview> {
    this.bookReviewsMap.set(bookReview.id, bookReview);
    return bookReview;
  }

  public async update(bookReview: BookReview): Promise<BookReview> {
    this.bookReviewsMap.set(bookReview.id, bookReview);
    return bookReview;
  }
}
