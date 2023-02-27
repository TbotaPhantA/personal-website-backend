import { BookReview } from './bookReview';
import { WithoutMethods } from '../../shared/types/withoutMethods';
import { UpdatableArticle } from '../article/updatableArticle';
import { CreateBookReviewByDtoParams } from './shared/types/createBookReviewByDtoParams';
import { assert, Invariant, path } from '@derbent-ninjas/invariant-composer';
import { Article } from '../article/article';

export class UpdatableBookReview extends BookReview {
  readonly article: UpdatableArticle;

  constructor(review: WithoutMethods<BookReview>) {
    super(review);
    this.article = new UpdatableArticle(review.article);
  }

  public update(...[dto, validation]: CreateBookReviewByDtoParams): UpdatableBookReview {
    assert(BookReview.name, this.canUpdate(dto, validation));
    const reviewId = this.id;
    return new UpdatableBookReview({
      id: reviewId,
      article: Article.createByDto(dto.article, validation),
    });
  }

  public canUpdate(...[dto, validation]: CreateBookReviewByDtoParams): Invariant {
    return path('article', this.article.canUpdate(dto.article, validation))
  }
}
