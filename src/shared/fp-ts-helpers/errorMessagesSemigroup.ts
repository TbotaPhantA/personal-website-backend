import * as NEA from 'fp-ts/NonEmptyArray';
import * as S from 'fp-ts/Semigroup';
import _ from 'lodash';
import { InvariantErrorMessages } from './types/invariantErrorMessages';
import { InvariantError } from './errors/invariantError';

export const errorMessagesSemigroup: S.Semigroup<InvariantError> = {
  concat: (x, y) => {
    const groupedErrorMessages = _.groupBy(NEA.concat(x.invariantErrors)(y.invariantErrors), em => em.path);

    x.invariantErrors = NEA.map((v: NEA.NonEmptyArray<InvariantErrorMessages>) => {
      const [first, ...rest] = v
      const messages = rest.reduce((acc, em) => NEA.concat(acc)(em.messages), first.messages)
      return {
        path: first.path,
        messages,
      }
    })(Object.values(groupedErrorMessages) as NEA.NonEmptyArray<NEA.NonEmptyArray<InvariantErrorMessages>>)

    return x;
  }
}
