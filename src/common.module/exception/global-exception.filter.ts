import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Logger } from '../log/Logger';

@Catch()
export class GlobalExceptionsFilter extends BaseExceptionFilter {

  catch(exception: unknown | HttpException, host: ArgumentsHost) {
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status >= 500) {
      Logger.error(exception);
    } else if (status >= 400) {
      Logger.warn(exception);
    }
    super.catch(exception, host);
  }
}
