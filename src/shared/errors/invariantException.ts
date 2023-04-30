import { HttpException } from '@nestjs/common';

export class InvariantException extends HttpException {
  public readonly data?: any;

  constructor(message: string, status: number, data?: any) {
    super(message, status);

    this.data = data;
  }
}
