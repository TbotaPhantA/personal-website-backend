import {
  display,
  Invariant,
  isFail,
  path,
  Success,
} from '@derbent-ninjas/invariant-composer';
import { InvariantException } from '../errors/invariantException';
import { HttpStatus } from '@nestjs/common';
import { CANNOT_UPDATE_BOOK_REVIEW } from '../../../../../shared/errorMessages';

export function assertCanUpdateBookReview(
  canUpdate: Invariant,
): asserts canUpdate is Success {
  path('BookReview', canUpdate);

  if (isFail(canUpdate)) {
    throw new InvariantException(
      CANNOT_UPDATE_BOOK_REVIEW,
      HttpStatus.BAD_REQUEST,
      display(canUpdate),
    );
  }
}
