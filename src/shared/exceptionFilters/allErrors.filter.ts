import { InvariantException } from '../../application/bookReview/shared/utils/errors/invariantException';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    if (exception instanceof InvariantException) {
      AllExceptionFilter.catchInvariantException(exception, host);
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
