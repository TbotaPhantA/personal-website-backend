import { InjectionBuilder } from 'ts-fixture-builder';
import { UserFormDto } from '../../../../src/domain/user/shared/dto/userForm.dto';
import { UserRoleEnum } from '../../../../src/domain/user/shared/enums/userRole.enum';

export class UserFormDtoBuilder {
  public static get defaultAll(): InjectionBuilder<UserFormDto> {
    return new InjectionBuilder<UserFormDto>(new UserFormDto()).with({
      username: 'some name',
      role: UserRoleEnum.ADMIN,
      password: 'some password',
    });
  }
}
