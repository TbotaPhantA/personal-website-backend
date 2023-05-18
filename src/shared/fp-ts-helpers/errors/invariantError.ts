import * as NEA from 'fp-ts/NonEmptyArray';
import { InvariantErrorMessages } from '../types/invariantErrorMessages';

export class InvariantError extends Error {
  invariantErrors: NEA.NonEmptyArray<InvariantErrorMessages>;

  constructor(errorMessages: NEA.NonEmptyArray<InvariantErrorMessages>) {
    super();
    this.invariantErrors = errorMessages;
  }
}
