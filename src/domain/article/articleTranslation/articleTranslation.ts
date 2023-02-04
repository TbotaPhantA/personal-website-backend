import { ArticleTranslationFormDto } from '../shared/dto/articleTranslationForm.dto';
import { v4 as uuid } from 'uuid';

export class ArticleTranslation {
  readonly id: string;
  readonly articleId: string;
  readonly languageId: string;
  readonly title: string;
  readonly content: string;

  constructor(dto: ArticleTranslationFormDto) {
    this.id = uuid();
    this.articleId = dto.articleId;
    this.languageId = dto.languageId;
    this.title = dto.title;
    this.content = dto.content;
  }
}
