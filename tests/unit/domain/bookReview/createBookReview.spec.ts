/* eslint-disable max-len */
import { BookReviewFormDtoBuilder } from '../../../__fixtures__/builders/bookReview/bookReviewForm.dto.builder';
import { BookReview } from '../../../../src/domain/bookReview/bookReview';
import { ArticleFormDtoBuilder } from '../../../__fixtures__/builders/article/articleForm.dto.builder';
import { ArticleTranslationFormDtoBuilder } from '../../../__fixtures__/builders/article/articleTranslationForm.dto';
import { success } from '@derbent-ninjas/invariant-composer';

describe('Create BookReview', () => {
  describe('constructor', () => {
    test('when proper dto passed - should be defined', () => {
      const dto = BookReviewFormDtoBuilder.defaultWithTranslation.result;
      const bookReview = new BookReview(dto);
      expect(bookReview).toBeDefined();
    });
  });

  describe('canCreate', () => {
    describe('languages must be not repeated', () => {
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
          expectedInvariant: success(),
        },
      ];

      test.each(testCases)('%s', ({ dto, expectedInvariant }) => {
        const canCreate = BookReview.canCreate(dto);
        expect(canCreate).toStrictEqual(expectedInvariant);
      });
    });
  });
});
