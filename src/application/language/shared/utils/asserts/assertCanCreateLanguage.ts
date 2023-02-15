import {
  display,
  Invariant,
  isFail,
  path,
  Success,
} from '@derbent-ninjas/invariant-composer';
import { InvariantException } from '../../../../bookReview/shared/utils/errors/invariantException';
import { CANNOT_CREATE_ARTICLE } from '../../../../../shared/errorMessages';
import { HttpStatus } from '@nestjs/common';
import { Language } from '../../../../../domain/language/language';

export function assertCanCreateLanguage(
  canCreate: Invariant,
): asserts canCreate is Success {
  path(Language.name, canCreate);

  if (isFail(canCreate)) {
    throw new InvariantException(
      CANNOT_CREATE_ARTICLE,
      HttpStatus.BAD_REQUEST,
      display(canCreate),
    );
  }
}
