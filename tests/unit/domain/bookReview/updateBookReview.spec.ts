import { BookReview } from '../../../../src/domain/bookReview/bookReview';
import { BookReviewFormDtoBuilder } from '../../../__fixtures__/builders/bookReview/bookReviewForm.dto.builder';
import { path, success, fail } from '@derbent-ninjas/invariant-composer';
import {
  LANGUAGES_DONT_EXIST,
  LANGUAGES_MUST_NOT_BE_REPEATED,
} from '../../../../src/shared/errorMessages';
import { ArticleFormDtoBuilder } from '../../../__fixtures__/builders/article/articleForm.dto.builder';
import { ArticleTranslationFormDtoBuilder } from '../../../__fixtures__/builders/article/articleTranslationForm.dto';
import { UpdatableBookReview } from '../../../../src/domain/bookReview/updatableBookReview';

const createValidBookReview = () => {
  const dto = BookReviewFormDtoBuilder.defaultWithTranslation.result;

  return BookReview.createByDto(dto, { doLanguagesExist: true });
};

describe('Update BookReview', () => {
  describe('update', () => {
    test('valid new dto - should not throw', () => {
      const bookReview = new UpdatableBookReview(createValidBookReview());

      const dto = BookReviewFormDtoBuilder.defaultWithTranslation.result;

      expect(() =>
        bookReview.update(dto, { doLanguagesExist: true }),
      ).not.toThrow();
    });

    test('valid new dto - article id should stay the same', () => {
      const bookReview = new UpdatableBookReview(createValidBookReview());

      const dto = BookReviewFormDtoBuilder.defaultWithTranslation.result;
      const articleId = bookReview.article.id;
      const newBookReview = bookReview.update(dto, { doLanguagesExist: true })
      expect(newBookReview.article.id).toStrictEqual(articleId);
    })

    test('invalid params - should throw', () => {
      const bookReview = new UpdatableBookReview(createValidBookReview());

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
      const bookReview = new UpdatableBookReview(createValidBookReview());
      const canUpdate = bookReview.canUpdate(dto, validation);
      expect(canUpdate).toStrictEqual(expectedInvariant);
    });
  });
});
