import { InvariantException } from '../errors/invariantException';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException, HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { InvalidDtoException } from '../errors/invalidDtoException';
import { InvariantError } from '../fp-ts-helpers/errors/invariantError';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    if (exception instanceof InvariantException) {
      AllExceptionFilter.catchInvariantException(exception, host);
    } else if (exception instanceof InvariantError) {
      AllExceptionFilter.catchInvariantError(exception, host);
    } else if (exception instanceof InvalidDtoException) {
      AllExceptionFilter.catchInvalidDtoException(exception, host);
    } else if (exception instanceof HttpException) {
      AllExceptionFilter.catchHttpException(exception, host);
    } else {
      AllExceptionFilter.catchInternalServerError(exception);
    }
  }

  private static catchInvariantException(
    exception: InvariantException,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();

    reply.code(status).send({
      statusCode: status,
      message: exception.message,
      timeStamp: new Date().toISOString(),
      data: exception.data,
      path: request.url,
    });
  }

  private static catchInvariantError(
    exception: InvariantError,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = HttpStatus.BAD_REQUEST;

    reply.code(status).send({
      statusCode: status,
      message: exception.message,
      data: exception.invariantErrors,
      timeStamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private static catchInvalidDtoException(
    exception: InvalidDtoException,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();

    reply.code(status).send({
      statusCode: status,
      message: exception.message,
      timeStamp: new Date().toISOString(),
      data: exception.data,
      path: request.url,
    });
  }

  private static catchHttpException(
    exception: HttpException,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();

    reply.code(status).send({
      statusCode: status,
      message: exception.message,
      timeStamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private static catchInternalServerError(error: any): void {
    console.error(error);
    throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
  }
}
