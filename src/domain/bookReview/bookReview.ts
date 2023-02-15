import { BookReviewFormDto } from './shared/dto/form/bookReviewForm.dto';
import { v4 as uuid } from 'uuid';
import { Article } from '../article/article';
import { assert, compose, Invariant } from '@derbent-ninjas/invariant-composer';
import { languagesMustNotBeRepeated } from './shared/utils/invariants/languagesMustNotBeRepeated';
import { allLanguageIdsMustExist } from './shared/utils/invariants/allLanguageIdsMustExist';

export interface ExtraBookReviewValidationProps {
  doLanguagesExist: boolean;
}

export class BookReview {
  readonly id: string;
  readonly article: Article;

  constructor(
    props: BookReviewFormDto,
    validation: ExtraBookReviewValidationProps,
  ) {
    assert(BookReview.name, BookReview.canCreate(props, validation));
    this.id = uuid();
    this.article = new Article(props.article);
  }

  public static canCreate(
    ...params: ConstructorParameters<typeof BookReview>
  ): Invariant {
    const [props, validation] = params;
    return compose(
      languagesMustNotBeRepeated(props),
      allLanguageIdsMustExist(validation),
    );
  }
}
