import * as NEA from 'fp-ts/NonEmptyArray';
import * as S from 'fp-ts/Semigroup';
import _ from 'lodash';
import { ErrorMessagesWithPath } from './types/errorMessagesWithPath';

export const errorMessagesSemigroup: S.Semigroup<NEA.NonEmptyArray<ErrorMessagesWithPath>> = {
  concat: (x, y) => {
    const groupedErrorMessages = _.groupBy(NEA.concat(x)(y), em => em.path);

    return NEA.map((v: NEA.NonEmptyArray<ErrorMessagesWithPath>): ErrorMessagesWithPath => {
      const [first, ...rest] = v
      const messages = rest.reduce((acc, em) => NEA.concat(acc)(em.messages), first.messages)
      return {
        _tag: 'ErrorMessagesWithPath',
        path: first.path,
        messages,
      }
    })(Object.values(groupedErrorMessages) as NEA.NonEmptyArray<NEA.NonEmptyArray<ErrorMessagesWithPath>>)
  }
}
