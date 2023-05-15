import { Invariant, success, fail } from '@derbent-ninjas/invariant-composer';
import { LANGUAGE_ID_MUST_BE_UNIQUE } from '../../../../shared/errorMessages';

export function languageIdMustBeUniqueInvariant(isLanguageIdUnique: boolean): Invariant {
  return isLanguageIdUnique
    ? success()
    : fail({ message: LANGUAGE_ID_MUST_BE_UNIQUE });
}
