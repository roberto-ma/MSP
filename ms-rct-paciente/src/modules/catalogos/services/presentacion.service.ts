/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { PresentacionRepository } from '../repositories/presentacion.repository';

@Injectable()
export class PresentacionService {
  constructor(
    @InjectRepository(PresentacionRepository)
    private readonly presentacionRepository: PresentacionRepository,
  ) {}

  async getPresentacionPorId(id: number) {
    const presentacion = await this.presentacionRepository
      .getPresentacionPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!presentacion)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Presentación '${id}' no encontrado`,
      });
    return presentacion;
  }
}
