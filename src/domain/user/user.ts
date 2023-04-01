import { assert, Invariant } from '@derbent-ninjas/invariant-composer';
import { WithoutMethods } from '../../shared/types/withoutMethods';
import { UserFormDto } from './shared/dto/userForm.dto';
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

  public static createByDto(dto: UserFormDto, validation: ExtraUserValidationProps): User {
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

  public static canCreateByDto(dto: UserFormDto, validation: ExtraUserValidationProps): Invariant {
    return usernameMustBeUnique(validation);
  }
}
