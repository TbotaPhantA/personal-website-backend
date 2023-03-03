import { Language } from './language';
import { WithoutMethods } from '../../shared/types/withoutMethods';
import { CreateLanguageByDtoParams } from './shared/types/createLanguageByDtoParams';
import { assert, Invariant } from '@derbent-ninjas/invariant-composer';
import { languageIdMustBeUnique } from './shared/invariants/languageIdMustBeUnique';

export class UpdatableLanguage extends Language {
  constructor(language: WithoutMethods<Language>) {
    super(language);
  }

  public update(...[dto, validation]: CreateLanguageByDtoParams): UpdatableLanguage {
    assert(Language.name, this.canUpdate(dto, validation));
    return new UpdatableLanguage(Language.createInstanceFromDto(dto));
  }

  public canUpdate(...[, validation]: CreateLanguageByDtoParams): Invariant {
    return languageIdMustBeUnique(validation.isIdUnique);
  }
}