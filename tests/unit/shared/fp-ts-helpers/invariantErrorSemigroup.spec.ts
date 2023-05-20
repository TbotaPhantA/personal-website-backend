import { invariantErrorSemigroup } from '../../../../src/shared/fp-ts-helpers/invariantErrorSemigroup';
import { InvariantError } from '../../../../src/shared/fp-ts-helpers/errors/invariantError';
import { createInvariantError } from '../../../../src/shared/fp-ts-helpers/utils/createInvariantError';
import { addPath } from '../../../../src/shared/fp-ts-helpers/utils/addPath';

describe('invariantErrorSemigroup', () => {
  const testCases = [
    {
      toString: () => '1',
      invariantError1: createInvariantError('ERROR_1'),
      invariantError2: createInvariantError('ERROR_2'),
      expectedInvariantError: new InvariantError([
        {
          path: '',
          messages: ['ERROR_1', 'ERROR_2']
        }
      ])
    },
    {
      toString: () => '2',
      invariantError1: addPath('path1', createInvariantError('ERROR_1')),
      invariantError2: addPath('path1', createInvariantError('ERROR_2')),
      expectedInvariantError: new InvariantError([
        {
          path: 'path1',
          messages: ['ERROR_1', 'ERROR_2']
        }
      ])
    },
    {
      toString: () => '3',
      invariantError1: addPath('path1', createInvariantError('ERROR_1')),
      invariantError2: addPath('path2', createInvariantError('ERROR_2')),
      expectedInvariantError: new InvariantError([
        {
          path: 'path1',
          messages: ['ERROR_1']
        },
        {
          path: 'path2',
          messages: ['ERROR_2']
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
