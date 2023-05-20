import { BookReview } from '../../../../src/domain/bookReview/bookReview';
import { BookReviewFormDtoBuilder } from '../../../__fixtures__/builders/bookReview/bookReviewForm.dto.builder';
import {
  LANGUAGES_DONT_EXIST,
  LANGUAGES_MUST_NOT_BE_REPEATED,
} from '../../../../src/shared/errorMessages';
import { ArticleFormDtoBuilder } from '../../../__fixtures__/builders/article/articleForm.dto.builder';
import { ArticleTranslationFormDtoBuilder } from '../../../__fixtures__/builders/article/articleTranslationForm.dto';
import * as E from 'fp-ts/Either';
import { Article } from '../../../../src/domain/article/article';
import { ArticleTranslation } from '../../../../src/domain/article/articleTranslation/articleTranslation';
import { addPath } from '../../../../src/shared/fp-ts-helpers/utils/addPath';
import { createInvariantError } from '../../../../src/shared/fp-ts-helpers/utils/createInvariantError';

jest.mock('ulid', () => ({
  ulid: jest.fn(() => 'ulid'),
}))

const createValidBookReview = () => {
  const dto = BookReviewFormDtoBuilder.defaultWithTranslation.result;

  const res = BookReview.createByDto(dto, { doLanguagesExist: true });
  if (E.isLeft(res)) {
    throw new Error('createValidBookReview method failed.');
  } else {
    return res.right;
  }
};

describe('Update BookReview', () => {
  describe('updateByDto', () => {
    const testCases = [
      {
        toString: () => '1',
        dto: BookReviewFormDtoBuilder.defaultWithTranslation.with({
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
        }).result,
        validation: { doLanguagesExist: true },
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
            translations: [
              ArticleTranslationFormDtoBuilder.defaultOnlyRequired.with({
                languageId: 'en',
              }).result,
            ],
          }).result,
        }).result,
        validation: { doLanguagesExist: true },
        expectedEither: E.left(addPath('article', createInvariantError(LANGUAGES_MUST_NOT_BE_REPEATED))),
      },
      {
        toString: () => '3',
        dto: BookReviewFormDtoBuilder.defaultWithTranslation.result,
        validation: { doLanguagesExist: false },
        expectedEither: E.left(addPath('article', createInvariantError(LANGUAGES_DONT_EXIST))),
      },
    ];

    test.each(testCases)('%s', ({ dto, validation, expectedEither }) => {
      const bookReview = createValidBookReview();
      const result = bookReview.updateByDto(dto, validation);
      expect(result).toStrictEqual(expectedEither);
    });
  });
});
