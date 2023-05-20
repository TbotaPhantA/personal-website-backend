import { User } from '../../../../../domain/user/user';
import { UnauthorizedException } from '@nestjs/common';
import { INCORRECT_USERNAME_OR_PASSWORD } from '../../../../../shared/errorMessages';
import * as E from 'fp-ts/Either';

export function assertPasswordMatches(passwordToCompare: string) {
  return function (user: User): E.Either<UnauthorizedException, User> {
    if (!user.doesPasswordMatch(passwordToCompare)) {
      return E.left(new UnauthorizedException(INCORRECT_USERNAME_OR_PASSWORD));
    } else {
      return E.right(user);
    }
  }
}
