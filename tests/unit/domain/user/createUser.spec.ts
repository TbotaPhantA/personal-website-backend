import { UserFormDtoBuilder } from '../../../__fixtures__/builders/user/userForm.dto.builder';
import { User } from '../../../../src/domain/user/user';
import * as E from 'fp-ts/Either';
import { createInvariantError } from '../../../../src/shared/fp-ts-helpers/utils/createInvariantError';
import { ERROR_CODES } from '../../../../src/shared/errors/errorMessages';
import { UserRoleEnum } from '../../../../src/domain/user/shared/enums/userRole.enum';

jest.mock('ulid', () => ({
  ulid: jest.fn(() => 'ulid'),
}))

jest.mock('bcryptjs', () => ({
  genSaltSync: jest.fn(() => 'salt'),
  hashSync: jest.fn(() => 'passwordHash'),
}))

describe('User', () => {
  describe('createByDto', () => {
    const failTestCases = [
      {
        toString: () => '1 username is not unique - should throw',
        dto: UserFormDtoBuilder.defaultAll.result,
        validation: { isUsernameUnique: false },
        expectedEither: E.left(createInvariantError(ERROR_CODES.USERNAME_ALREADY_EXISTS)),
      },
    ];

    test.each(failTestCases)('%s', ({ dto, validation, expectedEither }) => {
      const result = User.createByDto(dto, validation);
      expect(result).toStrictEqual(expectedEither);
    });

    const successTestCases = [
      {
        toString: () => '1 username is unique - should not throw',
        dto: UserFormDtoBuilder.defaultAll.result,
        validation: { isUsernameUnique: true },
        expectedEither: E.right(new User({
          userId: 'ulid',
          role: UserRoleEnum.ADMIN,
          username: 'name',
          passwordHash: 'passwordHash',
        })),
      },
    ]

    test.each(successTestCases)('%s', ({
      dto,
      validation,
      expectedEither,
    }) => {
      const result = User.createByDto(dto, validation);
      expect(result).toStrictEqual(expectedEither)
    });
  });
});
