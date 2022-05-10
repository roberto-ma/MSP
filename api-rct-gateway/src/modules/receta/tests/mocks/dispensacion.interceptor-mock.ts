import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { AES } from 'crypto-ts';

export class DispensacionInterceptorMock {
  async intercept(context: ExecutionContext, next: CallHandler) {
    let key: string;

    return next.handle().pipe(
      map(async (data) => {
        let encrypted: string;
        try {
          encrypted = AES.encrypt(JSON.stringify(data), key).toString();
        } catch (error) {
          throw new BadRequestException(`Error en el proceso de encriptación`);
        }
        return { data: encrypted };
      }),
    );
  }
}
