import { BookReviewFormDto } from './shared/dto/form/bookReviewForm.dto';
import { v4 as uuid } from 'uuid';
import { Article, ExtraArticleValidationProps } from '../article/article';
import { assert, Invariant, path } from '@derbent-ninjas/invariant-composer';

export type ExtraBookReviewValidationProps = ExtraArticleValidationProps;

export class BookReview {
  readonly id: string;
  readonly article: Article;

  constructor(
    props: BookReviewFormDto,
    validation: ExtraBookReviewValidationProps,
  ) {
    assert(BookReview.name, BookReview.canCreate(props, validation));
    this.id = uuid();
    this.article = new Article(props.article, validation);
  }

  public static canCreate(
    ...params: ConstructorParameters<typeof BookReview>
  ): Invariant {
    const [props, validation] = params;
    return path('article', Article.canCreate(props.article, validation));
  }
}
