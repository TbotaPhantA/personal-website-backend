import { invariantErrorSemigroup } from '../../../../src/shared/fp-ts-helpers/invariantErrorSemigroup';
import { InvariantError } from '../../../../src/shared/fp-ts-helpers/errors/invariantError';
import { createInvariantError } from '../../../../src/shared/fp-ts-helpers/utils/createInvariantError';
import { addPath } from '../../../../src/shared/fp-ts-helpers/utils/addPath';
import { ERROR_CODES } from '../../../../src/shared/errors/errorMessages';

describe('invariantErrorSemigroup', () => {
  const testCases = [
    {
      toString: () => '1',
      invariantError1: createInvariantError('ERROR_1' as ERROR_CODES),
      invariantError2: createInvariantError('ERROR_2' as ERROR_CODES),
      expectedInvariantError: new InvariantError([
        {
          path: '',
          messages: ['ERROR_1' as ERROR_CODES, 'ERROR_2' as ERROR_CODES]
        }
      ])
    },
    {
      toString: () => '2',
      invariantError1: addPath('path1', createInvariantError('ERROR_1' as ERROR_CODES)),
      invariantError2: addPath('path1', createInvariantError('ERROR_2' as ERROR_CODES)),
      expectedInvariantError: new InvariantError([
        {
          path: 'path1',
          messages: ['ERROR_1' as ERROR_CODES, 'ERROR_2' as ERROR_CODES]
        }
      ])
    },
    {
      toString: () => '3',
      invariantError1: addPath('path1', createInvariantError('ERROR_1' as ERROR_CODES)),
      invariantError2: addPath('path2', createInvariantError('ERROR_2' as ERROR_CODES)),
      expectedInvariantError: new InvariantError([
        {
          path: 'path1',
          messages: ['ERROR_1' as ERROR_CODES]
        },
        {
          path: 'path2',
          messages: ['ERROR_2' as ERROR_CODES]
        }
      ])
    },
  ];

  test.each(testCases)('%s', ({
    invariantError1,
    invariantError2,
    expectedInvariantError
  }) => {
    const result = invariantErrorSemigroup.concat(invariantError1, invariantError2);
    expect(result).toStrictEqual(expectedInvariantError);
  });
});
