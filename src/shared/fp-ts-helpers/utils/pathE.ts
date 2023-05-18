import * as E from 'fp-ts/Either';
import { InvariantError } from '../errors/invariantError';

type EMLeft = InvariantError;
type EMRight = any;

export function pathE<L extends EMLeft, R extends EMRight>(
  path: string,
  either: E.Either<L, R>
): E.Either<L, R> {
  if (E.isLeft(either)) {
    either.left.invariantErrors.forEach(em => {
      if (em.path === '') {
        em.path = path
      } else {
        em.path = `${path}.${em.path}`
      }
    })
  }

  return either
}
