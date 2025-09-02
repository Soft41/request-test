import { ArgumentsHost, ExceptionFilter, Logger } from '@nestjs/common';
import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const logger = new Logger(HttpExceptionFilter.name);

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const errorResponse = exception.getResponse();
      let error = errorResponse !== undefined ? errorResponse : '';

      if (typeof errorResponse === 'object') {
        if ('error' in errorResponse && 'message' in errorResponse) {
          const objectErrorResponse = errorResponse as {
            message: string;
          };

          const message = Array.isArray(objectErrorResponse.message)
            ? objectErrorResponse.message[0]
            : objectErrorResponse.message;

          error = {
            message,
          };
        } else if ('error' in errorResponse) {
          const objectErrorResponse = errorResponse as {
            error: Record<string, string>;
          };
          error = objectErrorResponse.error;
        } else if ('message' in errorResponse) {
          error = { message: errorResponse.message };
        }
      }

      response.status(status).send({
        error,
        status: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        data: exception.stack,
      });
    } else {
      logger.error(exception.message ?? 'Unknown error');

      response.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        timestamp: new Date().toISOString(),
        path: request.url,
        error: 'Unknown error',
        data: exception.stack,
      });
    }
  }
}
