// eslint-disable-next-line max-len
import { BookReviewLanguage } from '../../../../../src/modules/bookReview/domain/aggregates/langauge/bookReviewLanguage';
// eslint-disable-next-line max-len
import { CODE_MUST_BE_UNIQUE } from '../../../../../src/modules/bookReview/domain/aggregates/langauge/error-messages';
import { isFail, isSuccess } from '@derbent-ninjas/invariant-composer';

describe('BookReviewLanguage', () => {
  describe('canCreate', () => {
    const successTestCases = [
      {
        toString: () =>
          '1 valid language - should successfully create language',
        props: {
          code: 'en',
          name: 'English',
        },
        validation: {
          isCodeUnique: true,
        },
      },
    ];

    test.each(successTestCases)('%s', ({ props, validation }) => {
      const canCreate = BookReviewLanguage.canCreate(props, validation);
      expect(isSuccess(canCreate)).toStrictEqual(true);
    });

    const failTestCases = [
      {
        toString: () => '2 code is not unique - should throw',
        props: {
          code: 'en',
          name: 'English',
        },
        validation: {
          isCodeUnique: false,
        },
        expectedErrorMessage: CODE_MUST_BE_UNIQUE,
      },
    ];

    test.each(failTestCases)(
      '%s',
      ({ props, validation, expectedErrorMessage }) => {
        const canCreate = BookReviewLanguage.canCreate(props, validation);

        if (!isFail(canCreate)) {
          throw new Error('Invariant must be failed');
        }

        expect(canCreate.fail[0].customInfo.message).toStrictEqual(
          expectedErrorMessage,
        );
      },
    );
  });
});
