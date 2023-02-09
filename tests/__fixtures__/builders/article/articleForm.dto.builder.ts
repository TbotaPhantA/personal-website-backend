import { ArticleFormDto } from '../../../../src/domain/article/shared/dto/form/articleFormData.dto';
import { InjectionBuilder } from 'ts-fixture-builder';
import { ArticleTranslationFormDtoBuilder } from './articleTranslationForm.dto';

export class ArticleFormDtoBuilder {
  public static get defaultWithTranslation(): InjectionBuilder<ArticleFormDto> {
    return new InjectionBuilder<ArticleFormDto>(new ArticleFormDto()).with({
      originalLanguageId: 'en',
      originalTitle: 'Title',
      originalContent: 'Content',
      translations: [
        ArticleTranslationFormDtoBuilder.defaultOnlyRequired.result,
      ],
    });
  }
}
