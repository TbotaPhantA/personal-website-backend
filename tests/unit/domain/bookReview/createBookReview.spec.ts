/* eslint-disable max-len */
import { BookReviewFormDtoBuilder } from '../../../__fixtures__/builders/bookReview/bookReviewForm.dto.builder';
import { BookReview } from '../../../../src/domain/bookReview/bookReview';
import { ArticleFormDtoBuilder } from '../../../__fixtures__/builders/article/articleForm.dto.builder';
import { ArticleTranslationFormDtoBuilder } from '../../../__fixtures__/builders/article/articleTranslationForm.dto';
import { ERROR_CODES } from '../../../../src/shared/errors/errorMessages';
import * as E from 'fp-ts/Either';
import { Article } from '../../../../src/domain/article/article';
import { ArticleTranslation } from '../../../../src/domain/article/articleTranslation/articleTranslation';
import { createInvariantError } from '../../../../src/shared/fp-ts-helpers/utils/createInvariantError';
import { addPath } from '../../../../src/shared/fp-ts-helpers/utils/addPath';

jest.mock('ulid', () => ({
  ulid: jest.fn(() => 'ulid'),
}))

describe('Create BookReview', () => {
  describe('createByDto', () => {
    describe('languages must not be repeated', () => {
      const testCases = [
        {
          toString: () => '1',
          dto: BookReviewFormDtoBuilder.defaultWithTranslation.with({
            article: ArticleFormDtoBuilder.defaultWithTranslation.with({
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
          }).result,
          validation: {
            doLanguagesExist: true,
          },
          expectedEither: E.right(new BookReview({
            id: 'ulid',
            article: new Article({
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
                })
              ],
            })
          })),
        },
        {
          toString: () => '2',
          dto: BookReviewFormDtoBuilder.defaultWithTranslation.with({
            article: ArticleFormDtoBuilder.defaultWithTranslation.with({
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
          }).result,
          validation: {
            doLanguagesExist: true,
          },
          expectedEither: E.left(addPath('article', createInvariantError(ERROR_CODES.LANGUAGES_MUST_NOT_BE_REPEATED))),
        },
      ];

      test.each(testCases)('%s', ({
        dto,
        validation,
        expectedEither,
      }) => {
        const result = BookReview.createByDto(dto, validation);
        expect(result).toStrictEqual(expectedEither);
      });
    });

    describe('languagesId must exist', () => {
      const testCases = [
        {
          toString: () => '1',
          dto: BookReviewFormDtoBuilder.defaultWithTranslation.with({
            article: ArticleFormDtoBuilder.defaultWithTranslation.with({
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
          }).result,
          validation: {
            doLanguagesExist: false,
          },
          expectedEither: E.left(addPath('article', createInvariantError(ERROR_CODES.LANGUAGES_DONT_EXIST))),
        },
      ];

      test.each(testCases)('%s', ({
        dto,
        validation,
        expectedEither
      }) => {
        const result = BookReview.createByDto(dto, validation);
        expect(result).toStrictEqual(expectedEither);
      });
    });
  });
});
