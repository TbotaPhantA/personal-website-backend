import * as TE from 'fp-ts/TaskEither';
import * as NEA from 'fp-ts/NonEmptyArray';
import { pipe } from 'fp-ts/function';
import { ErrorMessagesWithPath } from '../types/errorMessagesWithPath';

type EMLeft = NEA.NonEmptyArray<ErrorMessagesWithPath>;
type EMRight = any;

export function pathTE<L extends EMLeft, R extends EMRight>(
  path: string,
  taskEither: TE.TaskEither<L, R>
): TE.TaskEither<L, R> {
  return pipe(
    taskEither,
    TE.mapLeft(l => {
      l.forEach(em => {
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
