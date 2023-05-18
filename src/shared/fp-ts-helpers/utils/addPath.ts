import { InvariantError } from '../errors/invariantError';

export const addPath = (path: string, invariantError: InvariantError) => {
  invariantError.invariantErrors.forEach(e => {
    e.path = e.path === ''
      ? path
      : `${path}${e.path}`
  })

  return invariantError;
}
