import { LanguageFormDto } from './shared/dto/form/languageForm.dto';
import { Invariant, assert } from '@derbent-ninjas/invariant-composer';
import { languageIdMustBeUnique } from './shared/invariants/languageIdMustBeUnique';
import { WithoutMethods } from '../../shared/types/withoutMethods';
import { ExtraLanguageValidationProps } from './shared/types/extraLanguageValidationProps';
import { CreateLanguageByDtoParams } from './shared/types/createLanguageByDtoParams';

export class Language {
  readonly id: string;
  readonly name: string;

  constructor(language: WithoutMethods<Language>) {
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
