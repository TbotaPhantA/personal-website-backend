// eslint-disable-next-line max-len
import { LanguageFormDtoBuilder } from '../../../__fixtures__/builders/language/languageForm.dto.builder';
import { Language } from '../../../../src/domain/language/language';

describe('Create Language', () => {
  describe('constructor', () => {
    test('when proper dto passed - should be defined', () => {
      const dto = LanguageFormDtoBuilder.defaultOnlyRequired.result;
      const language = new Language(dto);
      expect(language).toBeDefined();
    });
  });
});
