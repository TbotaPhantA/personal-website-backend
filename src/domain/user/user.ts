import { assert, Invariant } from '@derbent-ninjas/invariant-composer';
import { WithoutMethods } from '../../shared/types/withoutMethods';
import { CreateUserFormDto } from './shared/dto/form/createUserForm.dto';
import { ExtraUserValidationProps } from './shared/types/extraUserValidationProps';
import { ulid } from 'ulid';
import { UserRoleEnum } from './shared/enums/userRole.enum';
import * as bcrypt from 'bcryptjs';
import config from '../../infrastructure/config/config';
import { usernameMustBeUnique } from './shared/utils/isUsernameUnique';

export class User {
  readonly userId: string;
  readonly username: string;
  readonly role: UserRoleEnum;
  readonly passwordHash: string;

  constructor(userFields: WithoutMethods<User>) {
    Object.assign<User, WithoutMethods<User>>(this, userFields);
  }

  static createByDto(dto: CreateUserFormDto, validation: ExtraUserValidationProps): User {
    assert(User.name, User.canCreateByDto(dto, validation));
    const userId = ulid();
    const salt = bcrypt.genSaltSync(config.auth.saltRounds)
    const passwordHash = bcrypt.hashSync(dto.password, salt);
    return new User({
      userId,
      username: dto.username,
      role: dto.role,
      passwordHash,
    })
  }

  static canCreateByDto(dto: CreateUserFormDto, validation: ExtraUserValidationProps): Invariant {
    return usernameMustBeUnique(validation);
  }

  doesPasswordMatch(password: string): boolean {
    return bcrypt.compareSync(password, this.passwordHash);
  }
}
