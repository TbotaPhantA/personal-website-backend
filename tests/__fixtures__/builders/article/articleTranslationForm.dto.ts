// eslint-disable-next-line max-len
import { ArticleTranslationFormDto } from '../../../../src/domain/article/shared/dto/articleTranslationForm.dto';
import { InjectionBuilder } from 'ts-fixture-builder';

export class ArticleTranslationFormDtoBuilder {
  public static get defaultOnlyRequired(): InjectionBuilder<ArticleTranslationFormDto> {
    return new InjectionBuilder<ArticleTranslationFormDto>(
      new ArticleTranslationFormDto(),
    ).with({
      articleId: '1',
      languageId: 'ru',
      title: 'Заголовок',
      content: 'Содержание',
    });
  }
}
