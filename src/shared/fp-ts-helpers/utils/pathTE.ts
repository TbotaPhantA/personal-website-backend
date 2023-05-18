import * as TE from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import { InvariantError } from '../errors/invariantError';

type EMLeft = InvariantError;
type EMRight = any;

export function pathTE<L extends EMLeft, R extends EMRight>(
  path: string,
  taskEither: TE.TaskEither<L, R>
): TE.TaskEither<L, R> {
  return pipe(
    taskEither,
    TE.mapLeft(l => {
      l.invariantErrors.forEach(em => {
        if (em.path === '') {
          em.path = path
        } else {
          em.path = `${path}.${em.path}`
        }
      })

      return l
    })
  )

}
