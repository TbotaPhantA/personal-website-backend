import { Invariant, assert } from '@derbent-ninjas/invariant-composer';
import { LanguageFormDto } from './shared/dto/form/languageForm.dto';
import { languageIdMustBeUnique } from './shared/invariants/languageIdMustBeUnique';
import { ExtraLanguageValidationProps } from './shared/types/extraLanguageValidationProps';
import { CreateLanguageByDtoParams } from './shared/types/createLanguageByDtoParams';
import { RawLanguage } from './shared/types/rawLanguage';

export class Language {
  readonly id: string;
  readonly name: string;

  constructor(language: RawLanguage) {
    this.id = language.id;
    this.name = language.name;
  }

  public static createByDto(dto: LanguageFormDto, validation: ExtraLanguageValidationProps): Language {
    assert(Language.name, Language.canCreate(dto, validation));
    return Language.createInstanceFromDto(dto);
  }

  public static canCreate(...[, validation]: CreateLanguageByDtoParams): Invariant {
    return languageIdMustBeUnique(validation.isIdUnique);
  }

  protected static createInstanceFromDto(dto: LanguageFormDto): Language {
    return new Language({
      id: dto.id,
      name: dto.name,
    });
  }
}
