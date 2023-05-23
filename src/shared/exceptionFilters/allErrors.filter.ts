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
import { en } from '../i18n/invariants/invariants-en';
import { ru } from '../i18n/invariants/invariants-ru';
import { ERROR_CODES } from '../errors/errorMessages';
import * as NEA from 'fp-ts/NonEmptyArray';
import { InvariantErrorMessages } from '../fp-ts-helpers/types/invariantErrorMessages';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  public static messagesByLanguage: {
    ru: typeof ru,
    en: typeof en,
  } = {
    en,
    ru,
  };

  catch(exception: any, host: ArgumentsHost): any {
    if (exception instanceof InvariantError) {
      AllExceptionFilter.catchInvariantError(exception, host);
    } else if (exception instanceof InvalidDtoException) {
      AllExceptionFilter.catchInvalidDtoException(exception, host);
    } else if (exception instanceof HttpException) {
      AllExceptionFilter.catchHttpException(exception, host);
    } else {
      AllExceptionFilter.catchInternalServerError(exception);
    }
  }

  private static catchInvariantError(
    exception: InvariantError,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = HttpStatus.BAD_REQUEST;
    const locale = ctx.getRequest<FastifyRequest>().headers['accept-language'];

    reply.code(status).send({
      statusCode: status,
      message: exception.message,
      data: AllExceptionFilter.translateInvariantErrorMessages(exception.invariantErrors, locale),
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
    const locale = ctx.getRequest<FastifyRequest>().headers['accept-language'];
    const message = AllExceptionFilter.getLocalizedMessage(locale, exception.message)

    reply.code(status).send({
      statusCode: status,
      message,
      timeStamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private static catchInternalServerError(error: any): void {
    console.error(error);
    throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
  }

  private static getLocalizedMessage(locale: string | undefined, exceptionMessage: string): string {
    return (
      locale === 'ru'
        ? AllExceptionFilter.messagesByLanguage.ru?.[exceptionMessage as ERROR_CODES]
        : AllExceptionFilter.messagesByLanguage.en?.[exceptionMessage as ERROR_CODES]
    ) ?? exceptionMessage;
  }

  private static translateInvariantErrorMessages(messages: NEA.NonEmptyArray<InvariantErrorMessages>, locale: string | undefined) {
    return messages.map(messagesObject => {
      messagesObject.messages = messagesObject.messages.map(messageCode => {
        if (locale === 'ru') {
          return this.messagesByLanguage.ru[messageCode];
        }
        return this.messagesByLanguage.en[messageCode];
      }) as NEA.NonEmptyArray<ERROR_CODES>

      return messagesObject
    })
  }
}
