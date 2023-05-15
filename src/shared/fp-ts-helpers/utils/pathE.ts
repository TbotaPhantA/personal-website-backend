import * as E from 'fp-ts/Either';
import * as NEA from 'fp-ts/NonEmptyArray';
import { ErrorMessagesWithPath } from '../types/errorMessagesWithPath';

type EMLeft = NEA.NonEmptyArray<ErrorMessagesWithPath>;
type EMRight = any;

export function pathE<L extends EMLeft, R extends EMRight>(
  path: string,
  either: E.Either<L, R>
): E.Either<L, R> {
  if (E.isLeft(either)) {
    either.left.forEach(em => {
      if (em.path === '') {
        em.path = path
      } else {
        em.path = `${path}.${em.path}`
      }
    })
  }

  return either
}
