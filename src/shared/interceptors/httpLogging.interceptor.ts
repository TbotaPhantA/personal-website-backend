import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as winston from 'winston';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  private readonly logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.printf(({ level, message }) => {
        return `${level}: ${message}`
      })
    ),
    transports: [new winston.transports.Console()],
  })

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<FastifyRequest>();
    const res = context.switchToHttp().getResponse<FastifyReply>();

    const { ip, method, url } = req;
    const userAgent = req.headers['user-agent'] || '';

    return next.handle().pipe(
      tap(() => {
        const { statusCode } = res;
        const data = {
          ip,
          method,
          url,
          statusCode,
          userAgent,
        }
        this.logger.info(JSON.stringify(data, null, 2));
      }),
    );
  }
}
