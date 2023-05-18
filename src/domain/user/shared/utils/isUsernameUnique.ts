import { USERNAME_MUST_BE_UNIQUE } from '../../../../shared/errorMessages';
import { ExtraUserValidationProps } from '../types/extraUserValidationProps';
import { InvariantError } from '../../../../shared/fp-ts-helpers/errors/invariantError';
import { createInvariantError } from '../../../../shared/fp-ts-helpers/utils/createInvariantError';
import * as E from 'fp-ts/Either';

export function usernameMustBeUnique(validationProps: ExtraUserValidationProps): E.Either<InvariantError, ExtraUserValidationProps> {
  return validationProps.isUsernameUnique
    ? E.right(validationProps)
    : E.left(createInvariantError(USERNAME_MUST_BE_UNIQUE));
}
