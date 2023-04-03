import { User } from '../../../../../domain/user/user';
import { UnauthorizedException } from '@nestjs/common';
import { INCORRECT_USERNAME_OR_PASSWORD } from '../../../../../shared/errorMessages';

export function assertUserExists(user: User | undefined): asserts user is User {
  if (!user) {
    throw new UnauthorizedException(INCORRECT_USERNAME_OR_PASSWORD);
  }
}
