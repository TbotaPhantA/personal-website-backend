import { UnprocessableEntityException } from '@nestjs/common';

export class InvalidDtoException extends UnprocessableEntityException {
  public readonly data?: any;

  constructor(message: string, data?: any) {
    super(message);

    this.data = data;
  }
}
