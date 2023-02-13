import { ExtraBookReviewValidationProps } from '../../../bookReview';
import { Invariant, success, fail } from '@derbent-ninjas/invariant-composer';
import { LANGUAGE_DOESNT_EXIST } from '../../../../../shared/errorMessages';

export function allLanguageIdsMustExist(
  validation: ExtraBookReviewValidationProps,
): Invariant {
  return validation.doLanguagesExist
    ? success()
    : fail({ message: LANGUAGE_DOESNT_EXIST });
}
