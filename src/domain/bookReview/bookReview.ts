import { assert, Invariant, path } from '@derbent-ninjas/invariant-composer';
import { ulid } from 'ulid';
import { BookReviewFormDto } from './shared/dto/form/bookReviewForm.dto';
import { Article } from '../article/article';
import { ExtraBookReviewValidationProps } from './shared/types/extraBookReviewValidationProps';
import { CreateBookReviewByDtoParams } from './shared/types/createBookReviewByDtoParams';
import { RawBookReview } from './shared/types/rawBookReview';

export class BookReview {
  readonly id: string;
  readonly article: Article;

  constructor(review: RawBookReview) {
    this.id = review.id;
    this.article = new Article(review.article);
  }

  public static createByDto(
    dto: BookReviewFormDto,
    validation: ExtraBookReviewValidationProps,
  ): BookReview {
    assert(BookReview.name, BookReview.canCreateByDto(dto, validation));
    const reviewId = ulid();
    return new BookReview({
      id: reviewId,
      article: Article.createByDto(dto.article, validation),
    });
  }

  public static canCreateByDto(
    ...[dto, validation]: CreateBookReviewByDtoParams
  ): Invariant {
    return path('article', Article.canCreateByDto(dto.article, validation));
  }
}
