import { LanguageFormDto } from './shared/dto/form/languageForm.dto';
import { Invariant, assert } from '@derbent-ninjas/invariant-composer';
import { languageIdMustBeUnique } from './shared/invariants/languageIdMustBeUnique';

export interface ExtraLanguageValidationProps {
  readonly isIdUnique: boolean;
}
type CreateLanguageParams = [dto: LanguageFormDto, validation: ExtraLanguageValidationProps]

export class Language {
  private _id: string;
  private _name: string;

  get id() { return this._id }
  private set id(id: string) { this._id = id }

  get name() { return this._name }
  private set name(name: string) { this._name = name }

  constructor(dto: LanguageFormDto, validation: ExtraLanguageValidationProps) {
    assert(Language.name, Language.canCreate(dto, validation));
    this.id = dto.id;
    this.name = dto.name;
  }

  public static canCreate(...[, validation]: CreateLanguageParams): Invariant {
    return languageIdMustBeUnique(validation.isIdUnique);
  }

  public update(...[dto, validation]: CreateLanguageParams): void {
    assert(Language.name, Language.canCreate(dto, validation))
    this.id = dto.id;
    this.name = dto.name;
  }

  public canUpdate(...[, validation]: CreateLanguageParams): Invariant {
    return languageIdMustBeUnique(validation.isIdUnique);
  }
}
