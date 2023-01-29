import { ArticleTranslationFormDto } from '../shared/dto/articleTranslationForm.dto';
import { v4 as uuid } from 'uuid';

export class ArticleTranslation {
  private readonly id: string;
  private readonly articleId: string;
  private readonly languageId: string;
  private readonly title: string;
  private readonly content: string;

  constructor(dto: ArticleTranslationFormDto) {
    this.id = uuid();
    this.articleId = dto.articleId;
    this.languageId = dto.languageId;
    this.title = dto.title;
    this.content = dto.content;
  }
}
