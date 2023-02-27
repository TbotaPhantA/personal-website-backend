import { Article } from '../../../../src/domain/article/article';
// eslint-disable-next-line max-len
import { ArticleFormDtoBuilder } from '../../../__fixtures__/builders/article/articleForm.dto.builder';
import { ArticleTranslationFormDtoBuilder } from '../../../__fixtures__/builders/article/articleTranslationForm.dto';
import { fail, success } from '@derbent-ninjas/invariant-composer';
import {
  LANGUAGES_DONT_EXIST,
  LANGUAGES_MUST_NOT_BE_REPEATED,
} from '../../../../src/shared/errorMessages';

describe('create Article', () => {
  describe('constructor', () => {
    test('when proper dto passed - should be defined', () => {
      const dto = ArticleFormDtoBuilder.defaultWithTranslation.result;
      const article = Article.createByDto(dto, { doLanguagesExist: true });
      expect(article).toBeDefined();
    });

    test('when invalid dto passed - should throw', () => {
      const dto = ArticleFormDtoBuilder.defaultWithTranslation.result;
      expect(() => Article.createByDto(dto, { doLanguagesExist: false })).toThrow();
    });
  });

  describe('canCreate', () => {
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
        const canCreate = Article.canCreateByDto(dto, validation);
        expect(canCreate).toStrictEqual(expectedInvariant);
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
        const canCreate = Article.canCreateByDto(dto, validation);

        expect(canCreate).toStrictEqual(expectedInvariant);
      });
    });
  });
});
