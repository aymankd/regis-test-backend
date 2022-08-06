import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import * as MongooseError from 'mongoose/lib/error';

interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

@Catch(MongooseError)
export class MongoExceptionFilter implements ExceptionFilter {
  private error: ErrorResponse;
  private logger: Logger = new Logger('MongoExceptionFilter');

  setError(statusCode: HttpStatus, exception: MongooseError): void {
    this.logger.verbose(exception);
    this.error = {
      statusCode: statusCode,
      message: exception.message,
      error: exception.name,
    };
  }

  catch(exception: MongooseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    console.log(exception);
    switch (exception.name) {
      case 'CastError': {
        this.setError(HttpStatus.NOT_FOUND, exception);
        break;
      }
      case 'ValidationError': {
        this.setError(HttpStatus.BAD_REQUEST, exception);
        break;
      }
      default: {
        this.setError(HttpStatus.BAD_REQUEST, exception);
        break;
      }
    }
    return response.status(this.error.statusCode).json(this.error);
  }
}
