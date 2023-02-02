import { InjectionBuilder } from 'ts-fixture-builder';
import { LanguageFromDto } from '../../../../src/domain/language/shared/dto/languageFrom.dto';

export class LanguageFormDtoBuilder {
  public static get defaultOnlyRequired(): InjectionBuilder<LanguageFromDto> {
    return new InjectionBuilder<LanguageFromDto>(new LanguageFromDto());
  }
}
