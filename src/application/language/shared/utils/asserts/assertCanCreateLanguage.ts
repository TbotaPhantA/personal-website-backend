import {
  display,
  Invariant,
  isFail,
  path,
  Success,
} from '@derbent-ninjas/invariant-composer';
import { InvariantException } from '../../../../../shared/errors/invariantException';
import { CANNOT_CREATE_LANGUAGE } from '../../../../../shared/errorMessages';
import { HttpStatus } from '@nestjs/common';
import { Language } from '../../../../../domain/language/language';

export function assertCanCreateLanguage(
  canCreate: Invariant,
): asserts canCreate is Success {
  path(Language.name, canCreate);

  if (isFail(canCreate)) {
    throw new InvariantException(
      CANNOT_CREATE_LANGUAGE,
      HttpStatus.BAD_REQUEST,
      display(canCreate),
    );
  }
}
