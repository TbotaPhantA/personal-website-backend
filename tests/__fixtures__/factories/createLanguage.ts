import { Language } from '../../../src/domain/language/language';
import { LanguageFormDtoBuilder } from '../builders/language/languageForm.dto.builder';

export const createLanguage = (): Language => {
  return Language.createByDto(LanguageFormDtoBuilder.defaultOnlyRequired.result, { isIdUnique: true });
}
