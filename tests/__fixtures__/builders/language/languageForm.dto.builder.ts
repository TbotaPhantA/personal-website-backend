import { InjectionBuilder } from 'ts-fixture-builder';
import { LanguageFormDto } from '../../../../src/domain/language/shared/dto/form/languageForm.dto';

export class LanguageFormDtoBuilder {
  public static get defaultOnlyRequired(): InjectionBuilder<LanguageFormDto> {
    return new InjectionBuilder<LanguageFormDto>(new LanguageFormDto()).with({
      id: 'ru',
      name: 'Русский',
    });
  }
}
