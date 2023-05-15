import * as NEA from 'fp-ts/NonEmptyArray';

export interface ErrorMessagesWithPath {
  _tag: 'ErrorMessagesWithPath';
  path: string;
  messages: NEA.NonEmptyArray<string>;
}
