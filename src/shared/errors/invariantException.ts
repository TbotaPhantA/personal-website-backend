import { HttpException } from '@nestjs/common';
import { ERROR_CODES } from './errorMessages';
import * as NEA from 'fp-ts/NonEmptyArray';
import { InvariantErrorMessages } from '../fp-ts-helpers/types/invariantErrorMessages';

export class InvariantException extends HttpException {
  public readonly data: NEA.NonEmptyArray<InvariantErrorMessages>;

  constructor(message: ERROR_CODES, status: number, data: any) {
    super(message, status);

    this.data = data;
  }
}
