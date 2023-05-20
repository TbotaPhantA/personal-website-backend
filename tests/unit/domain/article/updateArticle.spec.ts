import { ArticleFormDtoBuilder } from '../../../__fixtures__/builders/article/articleForm.dto.builder';
import { ArticleTranslationFormDtoBuilder } from '../../../__fixtures__/builders/article/articleTranslationForm.dto';
import { Article } from '../../../../src/domain/article/article';
import {
  LANGUAGES_DONT_EXIST,
  LANGUAGES_MUST_NOT_BE_REPEATED,
} from '../../../../src/shared/errorMessages';
import * as E from 'fp-ts/Either';
import { createInvariantError } from '../../../../src/shared/fp-ts-helpers/utils/createInvariantError';
import { ArticleTranslation } from '../../../../src/domain/article/articleTranslation/articleTranslation';

jest.mock('ulid', () => ({
  ulid: jest.fn(() => 'ulid'),
}))

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

  const result = Article.createByDto(dto, { doLanguagesExist: true });

  if (E.isLeft(result)) {
    throw new Error('failed article creation');
  } else {
    return result.right;
  }
};

describe('update article', () => {
  describe('updateByDto', () => {
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
          expectedEither: E.right(new Article({
            id: 'ulid',
            originalLanguageId: 'en',
            originalTitle: 'Domain-Driven Design',
            originalContent: 'Aggregates are cool!',
            translations: [
              new ArticleTranslation({
                id: 'ulid',
                articleId: 'ulid',
                languageId: 'ru',
                title: 'Предметно-Ориентированое Проектирование',
                content: 'Аггрераты крутые!',
              }),
            ],
          })),
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
          expectedEither: E.left(createInvariantError(LANGUAGES_MUST_NOT_BE_REPEATED)),
        },
      ];

      test.each(testCases)('%s', ({
        dto,
        validation,
        expectedEither
      }) => {
        const article = createValidArticle();
        const result = article.updateByDto(dto, validation);
        expect(result).toStrictEqual(expectedEither);
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
          expectedInvariant: E.left(createInvariantError(LANGUAGES_DONT_EXIST)),
        },
      ];

      test.each(testCases)('%s', ({ dto, validation, expectedInvariant }) => {
        const article = createValidArticle();
        const result = article.updateByDto(dto, validation);
        expect(result).toStrictEqual(expectedInvariant);
      });
    });
  });
});
