import * as NEA from 'fp-ts/NonEmptyArray';

export interface InvariantErrorMessages {
  path: string;
  messages: NEA.NonEmptyArray<string>;
}
