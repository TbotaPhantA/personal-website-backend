import { UserRoleEnum } from '../../domain/user/shared/enums/userRole.enum';
import { SetMetadata } from '@nestjs/common';

export const Roles = (role: UserRoleEnum, ...rest: UserRoleEnum[]) => SetMetadata('roles', [role, ...rest]);
