import {
  display,
  Invariant,
  isFail,
  path,
  Success,
} from '@derbent-ninjas/invariant-composer';
import { InvariantException } from '../../../../../shared/errors/invariantException';
import { ERROR_CODES } from '../../../../../shared/errors/errorMessages';
import { HttpStatus } from '@nestjs/common';

export function assertCanCreateBookReview(
  canCreate: Invariant,
): asserts canCreate is Success {
  path('BookReview', canCreate);

  if (isFail(canCreate)) {
    throw new InvariantException(
      ERROR_CODES.CANNOT_CREATE_BOOK_REVIEW,
      HttpStatus.BAD_REQUEST,
      display(canCreate),
    );
  }
}
