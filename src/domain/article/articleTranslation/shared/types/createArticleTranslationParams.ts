import { ArticleTranslationFormDto } from '../../../shared/dto/form/articleTranslationForm.dto';

export type CreateArticleTranslationParams = ArticleTranslationFormDto & { articleId: string };
