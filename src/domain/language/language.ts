import { LanguageFormDto } from './shared/dto/form/languageForm.dto';
import { Invariant, assert } from '@derbent-ninjas/invariant-composer';
import { languageIdMustBeUnique } from './shared/invariants/languageIdMustBeUnique';

export interface ExtraLanguageValidationProps {
  isIdUnique: boolean;
}

export class Language {
  readonly id: string;
  readonly name: string;

  constructor(dto: LanguageFormDto, validation: ExtraLanguageValidationProps) {
    assert(Language.name, Language.canCreate(dto, validation));
    this.id = dto.id;
    this.name = dto.name;
  }

  public static canCreate(
    ...params: ConstructorParameters<typeof Language>
  ): Invariant {
    const [, validation] = params;
    return languageIdMustBeUnique(validation.isIdUnique);
  }
}
