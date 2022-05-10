/**
 * @ Author: Anthony Loyaga
 * @ Create Time: 2022-02-16 15:02:00
 * @ Modified by: Anthony Loyaga
 * @ Modified time: 2022-04-22 13:55:21
 * @ Description:
 */

import { Logger, HttpStatus } from '@nestjs/common';
import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RPCExceptionFilterLogger
  implements RpcExceptionFilter<RpcException>
{
  catch(exception: RpcException) {
    const error = exception.getError() as any;

    if (error?.statusCode != HttpStatus.NOT_FOUND) {
      // if (error?.logs) {
      //   Logger.error(exception?.message + ': ' + error?.logs);
      // } else {
      Logger.warn(exception?.message);
      // }
      //console.log(exception?.stack);
    }

    // if (error?.statusCode == HttpStatus.INTERNAL_SERVER_ERROR) {
    //   const message = exception?.message;

    // }

    return throwError(() => exception);
  }
}
