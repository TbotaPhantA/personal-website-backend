import { UnprocessableEntityException } from '@nestjs/common';
import { ValidationError } from 'class-validator-multi-lang-lite';

export class InvalidDtoException extends UnprocessableEntityException {
  public readonly data: {
    errors: ValidationError[];
  };

  constructor(message: string, data: any) {
    super(message);

    this.data = data;
  }
}
