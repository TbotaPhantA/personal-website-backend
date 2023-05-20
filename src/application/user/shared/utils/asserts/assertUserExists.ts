import { User } from '../../../../../domain/user/user';
import { UnauthorizedException } from '@nestjs/common';
import { INCORRECT_USERNAME_OR_PASSWORD } from '../../../../../shared/errorMessages';
import * as E from 'fp-ts/Either';

export function assertUserExists(user: User | undefined): E.Either<UnauthorizedException, User> {
  return user
    ? E.right(user)
    : E.left(new UnauthorizedException(INCORRECT_USERNAME_OR_PASSWORD))
}
