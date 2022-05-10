/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { TipoIdentificacionRepository } from '../repositories/tipo-identificacion.repository';

@Injectable()
export class TipoIdentificacionService {
  constructor(
    @InjectRepository(TipoIdentificacionRepository)
    private readonly tipoIdentificacionRepository: TipoIdentificacionRepository,
  ) {}

  async getTipoIdentificacionPorId(id: number) {
    const tipoIdentificacion = await this.tipoIdentificacionRepository
      .getTipoIdentificacionPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!tipoIdentificacion)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Tipo identificacion '${id}' no encontrado`,
      });
    return tipoIdentificacion;
  }

  async getTipoIdentificacionTodos() {
    const tipoIdentificacion = await this.tipoIdentificacionRepository
      .getTipoIdentificacionTodos()
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    return tipoIdentificacion;
  }
}
