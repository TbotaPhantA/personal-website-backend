import {
  display,
  Invariant,
  isFail,
  path,
  Success,
} from '@derbent-ninjas/invariant-composer';
import { InvariantException } from '../../../../../shared/errors/invariantException';
import { HttpStatus } from '@nestjs/common';
import { ERROR_CODES } from '../../../../../shared/errors/errorMessages';

export function assertCanUpdateBookReview(
  canUpdate: Invariant,
): asserts canUpdate is Success {
  path('BookReview', canUpdate);

  if (isFail(canUpdate)) {
    throw new InvariantException(
      ERROR_CODES.CANNOT_UPDATE_BOOK_REVIEW,
      HttpStatus.BAD_REQUEST,
      display(canUpdate),
    );
  }
}
