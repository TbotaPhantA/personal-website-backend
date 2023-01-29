import { ArticleTranslationFormDto } from './articleTranslationForm.dto';

export class ArticleFormDto {
  originalLanguageId: string;
  originalTitle: string;
  originalContent: string;
  translations: ArticleTranslationFormDto[];
}
