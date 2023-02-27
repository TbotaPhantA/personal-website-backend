import { BookReviewFormDto } from './shared/dto/form/bookReviewForm.dto';
import { v4 as uuid } from 'uuid';
import { Article } from '../article/article';
import { assert, Invariant, path } from '@derbent-ninjas/invariant-composer';
import { WithoutMethods } from '../../shared/types/withoutMethods';
import { ExtraBookReviewValidationProps } from './shared/types/extraBookReviewValidationProps';
import { CreateBookReviewByDtoParams } from './shared/types/createBookReviewByDtoParams';

export class BookReview {
  readonly id: string;
  readonly article: Article;

  constructor(review: WithoutMethods<BookReview>) {
    this.id = review.id;
    this.article = review.article;
  }

  public static createByDto(
    dto: BookReviewFormDto,
    validation: ExtraBookReviewValidationProps,
  ): BookReview {
    assert(BookReview.name, BookReview.canCreateByDto(dto, validation));
    const reviewId = uuid();
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
