import { Invariant, success, fail } from '@derbent-ninjas/invariant-composer';
import { ERROR_CODES } from '../../../../shared/errors/errorMessages';

export function languageIdMustBeUniqueInvariant(isLanguageIdUnique: boolean): Invariant {
  return isLanguageIdUnique
    ? success()
    : fail({ message: ERROR_CODES.LANGUAGE_ID_MUST_BE_UNIQUE });
}
