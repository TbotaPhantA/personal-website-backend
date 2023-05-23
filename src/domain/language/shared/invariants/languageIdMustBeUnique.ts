import { ERROR_CODES } from '../../../../shared/errors/errorMessages';
import * as E from 'fp-ts/Either';
import { InvariantError } from '../../../../shared/fp-ts-helpers/errors/invariantError';
import { createInvariantError } from '../../../../shared/fp-ts-helpers/utils/createInvariantError';

export function languageIdMustBeUnique(isLanguageIdUnique: boolean): E.Either<InvariantError, unknown> {
  return isLanguageIdUnique
    ? E.right(undefined)
    : E.left(createInvariantError(ERROR_CODES.LANGUAGE_ID_MUST_BE_UNIQUE));
}
