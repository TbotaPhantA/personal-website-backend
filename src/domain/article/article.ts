import { ArticleFormDto } from './shared/dto/articleFormData.dto';
import { v4 as uuid } from 'uuid';
import { ArticleTranslation } from './articleTranslation/articleTranslation';

export class Article {
  readonly id: string;
  readonly originalLanguageId: string;
  readonly originalTitle: string;
  readonly originalContent: string;
  readonly translations: ArticleTranslation[];

  constructor(dto: ArticleFormDto) {
    this.id = uuid();
    this.originalLanguageId = dto.originalLanguageId;
    this.originalTitle = dto.originalTitle;
    this.originalContent = dto.originalContent;
    this.translations = dto.translations.map(
      (translation) => new ArticleTranslation(translation),
    );
  }
}