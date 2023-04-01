import { UserFormDtoBuilder } from '../../../__fixtures__/builders/user/userForm.dto.builder';
import { User } from '../../../../src/domain/user/user';

describe('User', () => {
  describe('createByDto', () => {
    const throwTestCases = [
      {
        toString: () => '1 username is not unique - should throw',
        dto: UserFormDtoBuilder.defaultAll.result,
        validation: { isUsernameUnique: false },
      },
    ];

    test.each(throwTestCases)('%s', ({ dto, validation }) => {
      expect(() => User.createByDto(dto, validation)).toThrow();
    });

    const notThrowsTestCases = [
      {
        toString: () => '1 username is unique - should not throw',
        dto: UserFormDtoBuilder.defaultAll.result,
        validation: { isUsernameUnique: true },
      },
    ]

    test.each(notThrowsTestCases)('%s', ({
      dto,
      validation
    }) => {
      expect(() => User.createByDto(dto, validation)).not.toThrow();
    });
  });
});
