import { Language } from './language';
import { CreateLanguageByDtoParams } from './shared/types/createLanguageByDtoParams';
import { assert, Invariant } from '@derbent-ninjas/invariant-composer';
import { languageIdMustBeUnique } from './shared/invariants/languageIdMustBeUnique';
import { RawLanguage } from './shared/types/rawLanguage';

export class UpdatableLanguage extends Language {
  constructor(language: RawLanguage) { super(language) }

  update(...[dto, validation]: CreateLanguageByDtoParams): UpdatableLanguage {
    assert(Language.name, this.canUpdate(dto, validation));
    return new UpdatableLanguage(Language.createInstanceFromDto(dto));
  }

  canUpdate(...[, validation]: CreateLanguageByDtoParams): Invariant {
    return languageIdMustBeUnique(validation.isIdUnique);
  }
}
