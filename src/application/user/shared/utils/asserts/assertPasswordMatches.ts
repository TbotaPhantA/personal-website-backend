import { User } from '../../../../../domain/user/user';
import { UnauthorizedException } from '@nestjs/common';
import { ERROR_CODES } from '../../../../../shared/errors/errorMessages';
import * as E from 'fp-ts/Either';

export function assertPasswordMatches(passwordToCompare: string) {
  return function (user: User): E.Either<UnauthorizedException, User> {
    if (!user.doesPasswordMatch(passwordToCompare)) {
      return E.left(new UnauthorizedException(ERROR_CODES.INCORRECT_USERNAME_OR_PASSWORD));
    } else {
      return E.right(user);
    }
  }
}
