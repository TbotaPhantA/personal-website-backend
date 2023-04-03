import { InjectionBuilder } from 'ts-fixture-builder';
import { CreateUserFormDto } from '../../../../src/domain/user/shared/dto/createUserForm.dto';
import { UserRoleEnum } from '../../../../src/domain/user/shared/enums/userRole.enum';

export class UserFormDtoBuilder {
  public static get defaultAll(): InjectionBuilder<CreateUserFormDto> {
    return new InjectionBuilder<CreateUserFormDto>(new CreateUserFormDto()).with({
      username: 'some name',
      role: UserRoleEnum.ADMIN,
      password: 'some password',
    });
  }
}
