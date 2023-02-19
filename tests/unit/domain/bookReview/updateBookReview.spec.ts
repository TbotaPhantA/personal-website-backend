import { BookReview } from '../../../../src/domain/bookReview/bookReview';
import { BookReviewFormDtoBuilder } from '../../../__fixtures__/builders/bookReview/bookReviewForm.dto.builder';
import { path, success, fail } from '@derbent-ninjas/invariant-composer';
import {
  LANGUAGES_DONT_EXIST,
  LANGUAGES_MUST_NOT_BE_REPEATED,
} from '../../../../src/shared/errorMessages';
import { ArticleFormDtoBuilder } from '../../../__fixtures__/builders/article/articleForm.dto.builder';
import { ArticleTranslationFormDtoBuilder } from '../../../__fixtures__/builders/article/articleTranslationForm.dto';

const createValidBookReview = () => {
  const dto = BookReviewFormDtoBuilder.defaultWithTranslation.result;

  return new BookReview(dto, { doLanguagesExist: true });
};

describe('Update BookReview', () => {
  describe('update', () => {
    test('valid new dto - should not throw', () => {
      const bookReview = createValidBookReview();

      const dto = BookReviewFormDtoBuilder.defaultWithTranslation.result;

      expect(() =>
        bookReview.update(dto, { doLanguagesExist: true }),
      ).not.toThrow();
    });

    test('invalid params - should throw', () => {
      const bookReview = createValidBookReview();

      const dto = BookReviewFormDtoBuilder.defaultWithTranslation.result;

      expect(() =>
        bookReview.update(dto, { doLanguagesExist: false }),
      ).toThrow();
    });
  });

  describe('canUpdate', () => {
    const testCases = [
      {
        toString: () => '1',
        dto: BookReviewFormDtoBuilder.defaultWithTranslation.result,
        validation: { doLanguagesExist: true },
        expectedInvariant: path('article', success()),
      },
      {
        toString: () => '2',
        dto: BookReviewFormDtoBuilder.defaultWithTranslation.with({
          article: ArticleFormDtoBuilder.defaultWithTranslation.with({
            originalLanguageId: 'en',
            translations: [
              ArticleTranslationFormDtoBuilder.defaultOnlyRequired.with({
                languageId: 'en',
              }).result,
            ],
          }).result,
        }).result,
        validation: { doLanguagesExist: true },
        expectedInvariant: path(
          'article',
          fail({ message: LANGUAGES_MUST_NOT_BE_REPEATED }),
        ),
      },
      {
        toString: () => '3',
        dto: BookReviewFormDtoBuilder.defaultWithTranslation.result,
        validation: { doLanguagesExist: false },
        expectedInvariant: path(
          'article',
          fail({ message: LANGUAGES_DONT_EXIST }),
        ),
      },
    ];

    test.each(testCases)('%s', ({ dto, validation, expectedInvariant }) => {
      const bookReview = createValidBookReview();
      const canUpdate = bookReview.canUpdate(dto, validation);
      expect(canUpdate).toStrictEqual(expectedInvariant);
    });
  });
});
