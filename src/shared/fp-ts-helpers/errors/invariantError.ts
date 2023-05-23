import * as NEA from 'fp-ts/NonEmptyArray';
import { InvariantErrorMessages } from '../types/invariantErrorMessages';
import { INVARIANT_ERROR } from '../../errors/errorMessages';

export class InvariantError extends Error {
  invariantErrors: NEA.NonEmptyArray<InvariantErrorMessages>;

  constructor(errorMessages: NEA.NonEmptyArray<InvariantErrorMessages>) {
    super(INVARIANT_ERROR);
    this.invariantErrors = errorMessages;
  }
}
