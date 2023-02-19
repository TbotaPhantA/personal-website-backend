import { ArticleFormDtoBuilder } from '../../../__fixtures__/builders/article/articleForm.dto.builder';
import { ArticleTranslationFormDtoBuilder } from '../../../__fixtures__/builders/article/articleTranslationForm.dto';
import { Article } from '../../../../src/domain/article/article';

const createValidArticle = () => {
  const dto = ArticleFormDtoBuilder.defaultWithTranslation.with({
    originalLanguageId: 'en',
    originalTitle: 'Domain-Driven Design',
    originalContent: 'Aggregates are cool!',
    translations: [
      ArticleTranslationFormDtoBuilder.defaultOnlyRequired.with({
        languageId: 'ru',
        title: 'Предметно-Ориентированое Проектирование',
        content: 'Аггрераты крутые!',
      }).result,
    ],
  }).result;

  return new Article(dto, { doLanguagesExist: true });
};

describe('update article', () => {
  describe('update', () => {
    test('valid params - should properly update values', () => {
      const article = createValidArticle();

      const newValues = {
        originalLanguageId: 'en',
        originalTitle: 'new Domain-Driven Design',
        originalContent: 'new Aggregates are cool!',
        translations: [
          ArticleTranslationFormDtoBuilder.defaultOnlyRequired.with({
            languageId: 'es',
            title: 'bla bla',
            content: 'bla bla',
          }).result,
          ArticleTranslationFormDtoBuilder.defaultOnlyRequired.with({
            languageId: 'ru',
            title: 'new Предметно-Ориентированое Проектирование',
            content: 'new Аггрераты крутые!',
          }).result,
        ],
      };

      const updateDto =
        ArticleFormDtoBuilder.defaultWithTranslation.with(newValues).result;

      article.update(updateDto, { doLanguagesExist: true });

      expect({
        originalLanguageId: article.originalLanguageId,
        originalTitle: article.originalTitle,
        originalContent: article.originalContent,
        translations: [
          ArticleTranslationFormDtoBuilder.defaultOnlyRequired.with({
            languageId: article.translations[0].languageId,
            title: article.translations[0].title,
            content: article.translations[0].content,
          }).result,
          ArticleTranslationFormDtoBuilder.defaultOnlyRequired.with({
            languageId: article.translations[1].languageId,
            title: article.translations[1].title,
            content: article.translations[1].content,
          }).result,
        ],
      }).toStrictEqual(newValues);
    });

    test('invalid params - should throw', () => {
      const article = createValidArticle();

      expect(() => {
        article.update(ArticleFormDtoBuilder.defaultWithTranslation.result, {
          doLanguagesExist: false,
        });
      }).toThrow();
    });
  });
});
