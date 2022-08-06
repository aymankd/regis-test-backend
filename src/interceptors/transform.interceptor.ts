import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum Message {
  CREATED = 'Created successfully !',
  UPDATED = 'Updated successfully !',
  DELETED = 'Deleted successfully !',
  FOUND = 'Found successfully !',
  NOT_FOUND = 'Not found !',
  ALREADY_EXISTS = 'Item already exists !',
  INVALID_CREDENTIALS = 'Invalid credentials !',
  INVALID_TOKEN = 'Invalid token !',
  INVALID_REQUEST = 'Invalid request !',
  INVALID_PARAMETERS = 'Invalid parameters !',
}
export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  private message: string;

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const { statusCode } = context.switchToHttp().getResponse();
    const { method } = context.switchToHttp().getRequest();

    switch (method) {
      case 'GET':
        this.message = Message.FOUND;
        break;
      case 'POST':
        this.message = Message.CREATED;
        break;
      case 'PUT':
        this.message = Message.UPDATED;
        break;
      case 'PATCH':
        this.message = Message.UPDATED;
        break;
      case 'DELETE':
        this.message = Message.DELETED;
        break;
      default:
        this.message = 'Success';
    }

    return next.handle().pipe(
      map((data) => ({
        statusCode,
        message: this.message,
        data,
      })),
    );
  }
}
