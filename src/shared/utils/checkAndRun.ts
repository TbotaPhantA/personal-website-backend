import { pipe } from 'fp-ts/function';
import * as NEA from 'fp-ts/NonEmptyArray';
import * as E from 'fp-ts/Either';
import * as A from 'fp-ts/Apply';

export function checkAndRun<T>(
  checks: NEA.NonEmptyArray<E.Either<NEA.NonEmptyArray<string>, unknown>>,
  f: (...args: any[]) => T,
): E.Either<NEA.NonEmptyArray<string>, T> {
  const [first, ...rest] = checks;

  return pipe(
    A.sequenceT(E.getApplicativeValidation(NEA.getSemigroup<string>()))(first, ...rest),
    E.map(f),
  );
}
