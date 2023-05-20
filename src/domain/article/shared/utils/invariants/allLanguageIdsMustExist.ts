import { LANGUAGES_DONT_EXIST } from '../../../../../shared/errorMessages';
import { ExtraBookReviewValidationProps } from '../../../../bookReview/shared/types/extraBookReviewValidationProps';
import * as E from 'fp-ts/Either';
import { InvariantError } from '../../../../../shared/fp-ts-helpers/errors/invariantError';
import { createInvariantError } from '../../../../../shared/fp-ts-helpers/utils/createInvariantError';

export function allLanguageIdsMustExist(
  validation: ExtraBookReviewValidationProps,
): E.Either<InvariantError, ExtraBookReviewValidationProps> {
  return validation.doLanguagesExist
    ? E.right(validation)
    : E.left(createInvariantError(LANGUAGES_DONT_EXIST));
}
