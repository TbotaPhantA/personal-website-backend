import { BookReviewFormDto } from './shared/dto/form/bookReviewForm.dto';
import { v4 as uuid } from 'uuid';
import { Article, ExtraArticleValidationProps } from '../article/article';
import { assert, Invariant, path } from '@derbent-ninjas/invariant-composer';

export type ExtraBookReviewValidationProps = ExtraArticleValidationProps;
type BookReviewFormParams = ConstructorParameters<typeof BookReview>;

export class BookReview {
  private readonly _id: string;
  get id() { return this._id }

  private _article: Article;
  get article() { return this._article }
  private set article(article: Article) { this._article = article }

  constructor(
    dto: BookReviewFormDto,
    validation: ExtraBookReviewValidationProps,
  ) {
    assert(BookReview.name, BookReview.canCreate(dto, validation));
    this._id = uuid();
    this.article = new Article(dto.article, validation);
  }

  public static canCreate(
    ...[dto, validation]: BookReviewFormParams
  ): Invariant {
    return path('article', Article.canCreate(dto.article, validation));
  }

  public update(...[dto, validation]: BookReviewFormParams): void {
    this.article.update(dto.article, validation);
  }

  public canUpdate(...[dto, validation]: BookReviewFormParams): Invariant {
    return path('article', this.article.canUpdate(dto.article, validation));
  }
}
