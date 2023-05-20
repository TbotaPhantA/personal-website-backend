import { User } from '../../../../../domain/user/user';
import { UnauthorizedException } from '@nestjs/common';
import { INCORRECT_USERNAME_OR_PASSWORD } from '../../../../../shared/errorMessages';
import * as TE from 'fp-ts/TaskEither';

export function assertPasswordMatches(passwordToCompare: string) {
  return function (user: User): TE.TaskEither<UnauthorizedException, User> {
    if (!user.doesPasswordMatch(passwordToCompare)) {
      return TE.left(new UnauthorizedException(INCORRECT_USERNAME_OR_PASSWORD));
    } else {
      return TE.right(user);
    }
  }
}
