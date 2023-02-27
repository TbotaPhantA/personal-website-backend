import { ArticleFormDtoBuilder } from '../../../__fixtures__/builders/article/articleForm.dto.builder';
import { ArticleTranslationFormDtoBuilder } from '../../../__fixtures__/builders/article/articleTranslationForm.dto';
import { Article } from '../../../../src/domain/article/article';
import { fail, success } from '@derbent-ninjas/invariant-composer';
import {
  LANGUAGES_DONT_EXIST,
  LANGUAGES_MUST_NOT_BE_REPEATED,
} from '../../../../src/shared/errorMessages';
import { UpdatableArticle } from '../../../../src/domain/article/updatableArticle';

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

  return Article.createByDto(dto, { doLanguagesExist: true });
};

describe('update article', () => {
  describe('update', () => {
    test('valid params - should properly update values', () => {
      const article = new UpdatableArticle(createValidArticle());

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

      const updatedArticle = article.update(updateDto, { doLanguagesExist: true });

      expect({
        originalLanguageId: updatedArticle.originalLanguageId,
        originalTitle: updatedArticle.originalTitle,
        originalContent: updatedArticle.originalContent,
        translations: [
          ArticleTranslationFormDtoBuilder.defaultOnlyRequired.with({
            languageId: updatedArticle.translations[0].languageId,
            title: updatedArticle.translations[0].title,
            content: updatedArticle.translations[0].content,
          }).result,
          ArticleTranslationFormDtoBuilder.defaultOnlyRequired.with({
            languageId: updatedArticle.translations[1].languageId,
            title: updatedArticle.translations[1].title,
            content: updatedArticle.translations[1].content,
          }).result,
        ],
      }).toStrictEqual(newValues);
    });

    test('invalid params - should throw', () => {
      const article = new UpdatableArticle(createValidArticle());

      expect(() => {
        article.update(ArticleFormDtoBuilder.defaultWithTranslation.result, {
          doLanguagesExist: false,
        });
      }).toThrow();
    });
  });

  describe('canUpdate', () => {
    describe('languages must not be repeated', () => {
      const testCases = [
        {
          toString: () => '1',
          dto: ArticleFormDtoBuilder.defaultWithTranslation.with({
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
          }).result,
          validation: {
            doLanguagesExist: true,
          },
          expectedInvariant: success(),
        },
        {
          toString: () => '2',
          dto: ArticleFormDtoBuilder.defaultWithTranslation.with({
            originalLanguageId: 'en',
            originalTitle: 'Domain-Driven Design',
            originalContent: 'Aggregates are cool!',
            translations: [
              ArticleTranslationFormDtoBuilder.defaultOnlyRequired.with({
                languageId: 'en',
                title: 'Domain-Driven Design',
                content: 'Aggregates are cool!',
              }).result,
            ],
          }).result,
          validation: {
            doLanguagesExist: true,
          },
          expectedInvariant: fail({ message: LANGUAGES_MUST_NOT_BE_REPEATED }),
        },
      ];

      test.each(testCases)('%s', ({ dto, validation, expectedInvariant }) => {
        const article = new UpdatableArticle(Article.createByDto(
          ArticleFormDtoBuilder.defaultWithTranslation.result,
          { doLanguagesExist: true },
        ));
        const canUpdate = article.canUpdate(dto, validation);
        expect(canUpdate).toStrictEqual(expectedInvariant);
      });
    });

    describe('languagesId must exist', () => {
      const testCases = [
        {
          toString: () => '1',
          dto: ArticleFormDtoBuilder.defaultWithTranslation.with({
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
          }).result,
          validation: {
            doLanguagesExist: false,
          },
          expectedInvariant: fail({ message: LANGUAGES_DONT_EXIST }),
        },
      ];

      test.each(testCases)('%s', ({ dto, validation, expectedInvariant }) => {
        const article = new UpdatableArticle(Article.createByDto(
          ArticleFormDtoBuilder.defaultWithTranslation.result,
          { doLanguagesExist: true },
        ));
        const canUpdate = article.canUpdate(dto, validation);
        expect(canUpdate).toStrictEqual(expectedInvariant);
      });
    });
  });
});
