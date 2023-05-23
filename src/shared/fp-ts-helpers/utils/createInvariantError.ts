import { InvariantError } from '../errors/invariantError';
import { ERROR_CODES } from '../../errors/errorMessages';

export const createInvariantError = (message: ERROR_CODES): InvariantError => {
  return new InvariantError([{ path: '', messages: [message] }])
}
