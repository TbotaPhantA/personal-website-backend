import {
  display,
  Invariant,
  isFail,
  path,
  Success,
} from '@derbent-ninjas/invariant-composer';
import { InvariantException } from '../errors/invariantException';
import { CANNOT_CREATE_BOOK_REVIEW } from '../../../../../shared/errorMessages';
import { HttpStatus } from '@nestjs/common';

export function assertCanCreateBookReview(
  canCreate: Invariant,
): asserts canCreate is Success {
  path('BookReview', canCreate);

  if (isFail(canCreate)) {
    throw new InvariantException(
      CANNOT_CREATE_BOOK_REVIEW,
      HttpStatus.BAD_REQUEST,
      display(canCreate),
    );
  }
}
