import { Article } from '../../../../src/domain/article/article';
// eslint-disable-next-line max-len
import { ArticleFormDtoBuilder } from '../../../__fixtures__/builders/article/articleForm.dto.builder';

describe('create Article', () => {
  describe('constructor', () => {
    test('when proper dto passed - should be defined', () => {
      const dto = ArticleFormDtoBuilder.defaultWithTranslation.result;
      const article = new Article(dto);
      expect(article).toBeDefined();
    });
  });
});
