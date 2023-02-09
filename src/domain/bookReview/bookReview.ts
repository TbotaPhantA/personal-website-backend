import { BookReviewFormDto } from './shared/dto/form/bookReviewForm.dto';
import { v4 as uuid } from 'uuid';
import { Article } from '../article/article';
import { assert, Invariant } from '@derbent-ninjas/invariant-composer';
import { languagesMustNotBeRepeated } from './shared/utils/invariants/languagesMustNotBeRepeated';

export class BookReview {
  readonly id: string;
  readonly article: Article;

  constructor(props: BookReviewFormDto) {
    assert('BookReview', BookReview.canCreate(props));
    this.id = uuid();
    this.article = new Article(props.article);
  }

  public static canCreate(
    ...params: ConstructorParameters<typeof BookReview>
  ): Invariant {
    const [props] = params;
    return languagesMustNotBeRepeated(props);
  }
}
