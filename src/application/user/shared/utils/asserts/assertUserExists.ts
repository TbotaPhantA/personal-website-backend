import { User } from '../../../../../domain/user/user';
import { UnauthorizedException } from '@nestjs/common';
import { INCORRECT_USERNAME_OR_PASSWORD } from '../../../../../shared/errorMessages';
import * as TE from 'fp-ts/TaskEither';

export function assertUserExists(user: User | undefined): TE.TaskEither<UnauthorizedException, User> {
  return user
    ? TE.right(user)
    : TE.left(new UnauthorizedException(INCORRECT_USERNAME_OR_PASSWORD))
}
