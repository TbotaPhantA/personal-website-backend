import { User } from '../../../../../domain/user/user';
import { UnauthorizedException } from '@nestjs/common';
import { ERROR_CODES } from '../../../../../shared/errors/errorMessages';
import * as E from 'fp-ts/Either';

export function assertUserExists(user: User | undefined): E.Either<UnauthorizedException, User> {
  return user
    ? E.right(user)
    : E.left(new UnauthorizedException(ERROR_CODES.INCORRECT_USERNAME_OR_PASSWORD))
}
