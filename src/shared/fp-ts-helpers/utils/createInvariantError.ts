import { InvariantError } from '../errors/invariantError';

export const createInvariantError = (message: string): InvariantError => {
  return new InvariantError([{ path: '', messages: [message] }])
}
