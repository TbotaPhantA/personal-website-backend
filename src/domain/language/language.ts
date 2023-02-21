import { LanguageFormDto } from './shared/dto/form/languageForm.dto';
import { Invariant, assert } from '@derbent-ninjas/invariant-composer';
import { languageIdMustBeUnique } from './shared/invariants/languageIdMustBeUnique';

export interface ExtraLanguageValidationProps {
  isIdUnique: boolean;
}

export class Language {
  private _id: string;
  public get id() { return this._id }
  private set id(id: string) { this._id = id }

  private _name: string;
  public get name() { return this._name }
  private set name(name: string) { this._name = name }

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
