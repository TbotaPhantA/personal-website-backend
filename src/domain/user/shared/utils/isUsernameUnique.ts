import { Invariant, success, fail } from '@derbent-ninjas/invariant-composer';
import { USERNAME_MUST_BE_UNIQUE } from '../../../../shared/errorMessages';
import { ExtraUserValidationProps } from '../types/extraUserValidationProps';

export function usernameMustBeUnique({ isUsernameUnique }: ExtraUserValidationProps): Invariant {
  return isUsernameUnique
    ? success()
    : fail({ message: USERNAME_MUST_BE_UNIQUE });
}
