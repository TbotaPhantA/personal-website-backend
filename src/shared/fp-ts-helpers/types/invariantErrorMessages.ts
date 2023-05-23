import * as NEA from 'fp-ts/NonEmptyArray';
import { ERROR_CODES } from '../../errors/errorMessages';

export interface InvariantErrorMessages {
  path: string;
  messages: NEA.NonEmptyArray<ERROR_CODES>;
}
