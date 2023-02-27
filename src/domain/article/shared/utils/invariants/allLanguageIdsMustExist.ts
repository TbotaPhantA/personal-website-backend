import { Invariant, success, fail } from '@derbent-ninjas/invariant-composer';
import { LANGUAGES_DONT_EXIST } from '../../../../../shared/errorMessages';
import { ExtraBookReviewValidationProps } from '../../../../bookReview/shared/types/extraBookReviewValidationProps';

export function allLanguageIdsMustExist(
  validation: ExtraBookReviewValidationProps,
): Invariant {
  return validation.doLanguagesExist
    ? success()
    : fail({ message: LANGUAGES_DONT_EXIST });
}
