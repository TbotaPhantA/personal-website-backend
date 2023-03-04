import { v4 as uuid } from 'uuid';
import { CreateArticleTranslationParams } from './shared/types/createArticleTranslationParams';
import { RawArticleTranslation } from './shared/types/RawArticleTranslation';

export class ArticleTranslation {
  readonly id: string;
  readonly articleId: string;
  readonly languageId: string;
  readonly title: string;
  readonly content: string;

  constructor(raw: RawArticleTranslation) {
    this.id = raw.id;
    this.articleId = raw.articleId;
    this.languageId = raw.languageId;
    this.title = raw.title;
    this.content = raw.content;
  }

  public static createByDto(props: CreateArticleTranslationParams) {
    return new ArticleTranslation({
      id: uuid(),
      articleId: props.articleId,
      languageId: props.languageId,
      title: props.title,
      content: props.content,
    })
  }
}
