// eslint-disable-next-line max-len
import { BookReviewFormDtoBuilder } from '../../../__fixtures__/builders/bookReview/bookReviewForm.dto.builder';
import { BookReview } from '../../../../src/domain/bookReview/bookReview';

describe('Create BookReview', () => {
  describe('constructor', () => {
    test('when proper dto passed - should be defined', () => {
      const dto = BookReviewFormDtoBuilder.defaultWithTranslation.result;
      const bookReview = new BookReview(dto);
      expect(bookReview).toBeDefined();
    });
  });
});
