import { BookReviewRepository } from './bookReviewRepository';
import { BookReview } from '../../../domain/bookReview/bookReview';
import * as T from 'fp-ts/Task';

export class InMemoryBookReviewRepository implements BookReviewRepository {
  private readonly bookReviewsMap: Map<string, BookReview> = new Map<
    string,
    BookReview
  >();

  public getAll(): T.Task<BookReview[]> {
    return async () => {
      return Array.from(this.bookReviewsMap.values());
    }
  }

  public findById(id: string): T.Task<BookReview | undefined> {
    return async () => {
      return this.bookReviewsMap.get(id);
    }
  }

  public insert(): (bookReview: BookReview) => T.Task<BookReview> {
    return (bookReview: BookReview) => {
      return async () => {
        this.bookReviewsMap.set(bookReview.id, bookReview);
        return bookReview;
      }
    }
  }

  public update(): (bookReview: BookReview) => T.Task<BookReview> {
    return (bookReview: BookReview) => {
      return async () => {
        this.bookReviewsMap.set(bookReview.id, bookReview);
        return bookReview;
      }
    }
  }
}
