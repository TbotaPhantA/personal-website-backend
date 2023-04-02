import { BookReview } from './bookReview';
import { UpdatableArticle } from '../article/updatableArticle';
import { CreateBookReviewByDtoParams } from './shared/types/createBookReviewByDtoParams';
import { assert, Invariant, path } from '@derbent-ninjas/invariant-composer';
import { RawBookReview } from './shared/types/rawBookReview';

export class UpdatableBookReview extends BookReview {
  readonly article: UpdatableArticle;

  constructor(review: RawBookReview) {
    super(review);
    this.article = new UpdatableArticle(review.article);
  }

  update(...[dto, validation]: CreateBookReviewByDtoParams): UpdatableBookReview {
    assert(BookReview.name, this.canUpdate(dto, validation));
    const reviewId = this.id;
    return new UpdatableBookReview({
      id: reviewId,
      article: this.article.update(dto.article, validation),
    });
  }

  canUpdate(...[dto, validation]: CreateBookReviewByDtoParams): Invariant {
    return path('article', this.article.canUpdate(dto.article, validation))
  }
}
