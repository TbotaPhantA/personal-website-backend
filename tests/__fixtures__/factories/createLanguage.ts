import { Language } from '../../../src/domain/language/language';
import { LanguageFormDtoBuilder } from '../builders/language/languageForm.dto.builder';

export const createLanguage = (): Language => {
  return new Language(LanguageFormDtoBuilder.defaultOnlyRequired.result, { isIdUnique: true });
}
