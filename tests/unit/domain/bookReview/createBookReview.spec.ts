/* eslint-disable max-len */
import { BookReviewFormDtoBuilder } from '../../../__fixtures__/builders/bookReview/bookReviewForm.dto.builder';
import { BookReview } from '../../../../src/domain/bookReview/bookReview';
import { ArticleFormDtoBuilder } from '../../../__fixtures__/builders/article/articleForm.dto.builder';
import { ArticleTranslationFormDtoBuilder } from '../../../__fixtures__/builders/article/articleTranslationForm.dto';
import { success, fail } from '@derbent-ninjas/invariant-composer';
import {
  LANGUAGE_DOESNT_EXIST,
  LANGUAGES_MUST_NOT_BE_REPEATED,
} from '../../../../src/shared/errorMessages';

describe('Create BookReview', () => {
  describe('constructor', () => {
    test('when proper dto passed - should be defined', () => {
      const dto = BookReviewFormDtoBuilder.defaultWithTranslation.result;
      const validation = { doLanguagesExist: true };
      const bookReview = new BookReview(dto, validation);
      expect(bookReview).toBeDefined();
    });

    test('when incorrect dto - should throw an exception', () => {
      const invalidData = BookReviewFormDtoBuilder.defaultWithTranslation.with({
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
      }).result;

      const validation = { doLanguagesExist: true };

      expect(() => new BookReview(invalidData, validation)).toThrow();
    });
  });

  describe('canCreate', () => {
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
          expectedInvariant: success(),
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
          expectedInvariant: fail({ message: LANGUAGES_MUST_NOT_BE_REPEATED }),
        },
      ];

      test.each(testCases)('%s', ({ dto, validation, expectedInvariant }) => {
        const canCreate = BookReview.canCreate(dto, validation);
        expect(canCreate).toStrictEqual(expectedInvariant);
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
          expectedInvariant: fail({ message: LANGUAGE_DOESNT_EXIST }),
        },
      ];

      test.each(testCases)('%s', ({ dto, validation, expectedInvariant }) => {
        const canCreate = BookReview.canCreate(dto, validation);

        expect(canCreate).toStrictEqual(expectedInvariant);
      });
    });
  });
});
