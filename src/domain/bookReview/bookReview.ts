import { ulid } from 'ulid';
import { BookReviewFormDto } from './shared/dto/form/bookReviewForm.dto';
import { Article } from '../article/article';
import { ExtraBookReviewValidationProps } from './shared/types/extraBookReviewValidationProps';
import { RawBookReview } from './shared/types/rawBookReview';
import { pipe } from 'fp-ts/lib/function';
import * as A from 'fp-ts/Apply';
import * as E from 'fp-ts/Either';
import { pathE } from '../../shared/fp-ts-helpers/utils/pathE';
import { InvariantError } from '../../shared/fp-ts-helpers/errors/invariantError';
import { eitherValidation } from '../../shared/fp-ts-helpers/validation';

export class BookReview {
  readonly id: string;
  readonly article: Article;

  constructor(review: RawBookReview) {
    this.id = review.id;
    this.article = new Article(review.article);
  }

  static createByDto(
    dto: BookReviewFormDto,
    validation: ExtraBookReviewValidationProps,
  ): E.Either<InvariantError, BookReview> {
    return pipe(
      A.sequenceT(eitherValidation)(
        pathE('article', Article.createByDto(dto.article, validation)),
      ),
      E.map(([article]) => new BookReview({ id: ulid(), article })),
    )
  }

  updateByDto(
    dto: BookReviewFormDto,
    validation: ExtraBookReviewValidationProps,
  ): E.Either<InvariantError, BookReview> {
    return pipe(
      A.sequenceT(eitherValidation)(
        pathE('article', this.article.updateByDto(dto.article, validation)),
      ),
      E.map(([article]) => new BookReview({ id: this.id, article })),
    )
  }
}
