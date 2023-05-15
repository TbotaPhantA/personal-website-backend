import { LANGUAGE_ID_MUST_BE_UNIQUE } from '../../../../shared/errorMessages';
import * as E from 'fp-ts/Either';
import * as NEA from 'fp-ts/NonEmptyArray';
import { ErrorMessagesWithPath } from '../../../../shared/fp-ts-helpers/types/errorMessagesWithPath';
import { emwp } from '../../../../shared/fp-ts-helpers/emwp';

export function languageIdMustBeUnique(isLanguageIdUnique: boolean): E.Either<NEA.NonEmptyArray<ErrorMessagesWithPath>, unknown> {
  return isLanguageIdUnique
    ? E.right(undefined)
    : E.left([emwp(LANGUAGE_ID_MUST_BE_UNIQUE)]);
}
