import { InjectionBuilder } from 'ts-fixture-builder';
import { BookReviewFormDto } from '../../../../src/domain/bookReview/shared/dto/bookReviewForm.dto';
import { ArticleFormDtoBuilder } from '../article/articleForm.dto.builder';

export class BookReviewFormDtoBuilder {
  public static get defaultWithTranslation(): InjectionBuilder<BookReviewFormDto> {
    return new InjectionBuilder<BookReviewFormDto>(
      new BookReviewFormDto(),
    ).with({
      article: ArticleFormDtoBuilder.defaultWithTranslation.result,
    });
  }
}
