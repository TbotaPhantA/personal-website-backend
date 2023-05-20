import { CreateUserFormDto } from './shared/dto/form/createUserForm.dto';
import { ExtraUserValidationProps } from './shared/types/extraUserValidationProps';
import { UserRoleEnum } from './shared/enums/userRole.enum';
import { usernameMustBeUnique } from './shared/utils/isUsernameUnique';
import { RawUser } from './shared/types/rawUser';
import * as bcrypt from 'bcryptjs';
import * as E from 'fp-ts/Either';
import { InvariantError } from '../../shared/fp-ts-helpers/errors/invariantError';
import { pipe } from 'fp-ts/lib/function';
import * as A from 'fp-ts/Apply';
import { invariantErrorSemigroup } from '../../shared/fp-ts-helpers/invariantErrorSemigroup';
import { pathE } from '../../shared/fp-ts-helpers/utils/pathE';
import { ulid } from 'ulid';
import config from '../../infrastructure/config/config';

export class User {
  readonly userId: string;
  readonly username: string;
  readonly role: UserRoleEnum;
  readonly passwordHash: string;

  constructor(rawUser: RawUser) {
    Object.assign<User, RawUser>(this, rawUser);
  }

  static createByDto(dto: CreateUserFormDto, validation: ExtraUserValidationProps): E.Either<InvariantError, User> {
    return pipe(
      A.sequenceT(E.getApplicativeValidation(invariantErrorSemigroup))(
        pathE('username', usernameMustBeUnique(validation)),
      ),
      E.map(() => bcrypt.genSaltSync(config.auth.saltRounds)),
      E.map((salt) => bcrypt.hashSync(dto.password, salt)),
      E.map((passwordHash) => new User({
        userId: ulid(),
        username: dto.username,
        role: dto.role,
        passwordHash,
      }))
    )
  }

  doesPasswordMatch(password: string): boolean {
    return bcrypt.compareSync(password, this.passwordHash);
  }
}
