import { LanguageFormDto } from './shared/dto/form/languageForm.dto';
import { ExtraLanguageValidationProps } from './shared/types/extraLanguageValidationProps';
import { RawLanguage } from './shared/types/rawLanguage';
import * as A from 'fp-ts/Apply';
import * as E from 'fp-ts/Either';
import { languageIdMustBeUnique } from './shared/invariants/languageIdMustBeUnique';
import { pipe } from 'fp-ts/function';
import { errorMessagesSemigroup } from '../../shared/fp-ts-helpers/errorMessagesSemigroup';
import { pathE } from '../../shared/fp-ts-helpers/utils/pathE';
import { InvariantError } from '../../shared/fp-ts-helpers/errors/invariantError';

export class Language {
  readonly id: string;
  readonly name: string;

  constructor(language: RawLanguage) {
    this.id = language.id;
    this.name = language.name;
  }

  public static createByDto(
    dto: LanguageFormDto,
    validation: ExtraLanguageValidationProps,
  ): E.Either<InvariantError, Language> {
    return pipe(
      A.sequenceT(E.getApplicativeValidation(errorMessagesSemigroup))(
        pathE('id', languageIdMustBeUnique(validation.isIdUnique)),
      ),
      E.map(() => new Language(dto)),
    );
  }

  public updateByDto(
    dto: LanguageFormDto,
    validation: ExtraLanguageValidationProps,
  ): E.Either<InvariantError, Language> {
    return pipe(
      A.sequenceT(E.getApplicativeValidation(errorMessagesSemigroup))(
        pathE('id', languageIdMustBeUnique(validation.isIdUnique)),
      ),
      E.map(() => new Language({ ...this, ...dto })),
    );
  }
}
