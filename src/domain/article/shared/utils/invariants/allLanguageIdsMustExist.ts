import { ExtraBookReviewValidationProps } from '../../../../bookReview/bookReview';
import { Invariant, success, fail } from '@derbent-ninjas/invariant-composer';
import { LANGUAGES_DONT_EXIST } from '../../../../../shared/errorMessages';

export function allLanguageIdsMustExist(
  validation: ExtraBookReviewValidationProps,
): Invariant {
  return validation.doLanguagesExist
    ? success()
    : fail({ message: LANGUAGES_DONT_EXIST });
}
