import { InjectionBuilder } from 'ts-fixture-builder';
import { User } from '../../../../src/domain/user/user';
import { UserRoleEnum } from '../../../../src/domain/user/shared/enums/userRole.enum';
import * as bcrypt from 'bcryptjs';
import config from '../../../../src/infrastructure/config/config';

export class UserBuilder {
  static get defaultAll(): InjectionBuilder<User> {
    const password = 'test';
    const salt = bcrypt.genSaltSync(config.auth.saltRounds);
    const passwordHash = bcrypt.hashSync(password, salt);

    return new InjectionBuilder<User>(new User({
      userId: 'uuid',
      username: 'test',
      role: UserRoleEnum.ADMIN,
      passwordHash,
    }))
  }
}
