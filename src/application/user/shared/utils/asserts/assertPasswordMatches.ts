import { User } from '../../../../../domain/user/user';
import { UnauthorizedException } from '@nestjs/common';
import { INCORRECT_USERNAME_OR_PASSWORD } from '../../../../../shared/errorMessages';

export function assertPasswordMatches(user: User, passwordToCompare: string): void {
  if (!user.doesPasswordMatch(passwordToCompare)) {
    throw new UnauthorizedException(INCORRECT_USERNAME_OR_PASSWORD);
  }
}
