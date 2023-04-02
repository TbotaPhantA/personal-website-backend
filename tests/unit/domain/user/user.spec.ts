import { UserFormDtoBuilder } from '../../../__fixtures__/builders/user/userForm.dto.builder';
import { User } from '../../../../src/domain/user/user';
import * as bcrypt from 'bcryptjs';
import config from '../../../../src/infrastructure/config/config';
import { UserBuilder } from '../../../__fixtures__/builders/user/user.builder';

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

  describe('doesPasswordMatch', () => {
    const testCases = [
      {
        toString: () => '1',
        actualUserPassword: 'test1',
        passedPassword: 'test1',
        expectedDoesMatch: true,
      },
      {
        toString: () => '2',
        actualUserPassword: 'test1',
        passedPassword: 'test2',
        expectedDoesMatch: false,
      },
    ]

    test.each(testCases)('%s', ({ actualUserPassword, passedPassword, expectedDoesMatch }) => {
      const salt = bcrypt.genSaltSync(config.auth.saltRounds);
      const passwordHash = bcrypt.hashSync(actualUserPassword, salt);
      const user = UserBuilder.defaultAll.with({
        passwordHash,
      }).result;
      expect(user.doesPasswordMatch(passedPassword)).toStrictEqual(expectedDoesMatch);
    })
  })
});
