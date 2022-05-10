/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { TipoAtencionRepository } from '../repositories/tipo-atencion.repository';

@Injectable()
export class TipoAtencionService {
  constructor(
    @InjectRepository(TipoAtencionRepository)
    private readonly tipoAtencionRepository: TipoAtencionRepository,
  ) {}

  async getTipoAtencionPorId(id: number) {
    const tipoAtencion = await this.tipoAtencionRepository
      .getTipoAtencionPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!tipoAtencion)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Tipo atencion '${id}' no encontrado`,
      });
    return tipoAtencion;
  }

  async getTipoAtencionTodos() {
    const tipoAtencion = await this.tipoAtencionRepository
      .getTipoAtencionTodos()
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    return tipoAtencion;
  }
}
