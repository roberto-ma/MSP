/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { DosificacionRepository } from '../repositories/dosificacion.repository';

@Injectable()
export class DosificacionService {
  constructor(
    @InjectRepository(DosificacionRepository)
    private readonly dosificacionRepository: DosificacionRepository,
  ) {}

  async getDosificacionPorId(id: number) {
    const dosificacion = await this.dosificacionRepository
      .getDosificacionPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!dosificacion)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Dosificación '${id}' no encontrado`,
      });
    return dosificacion;
  }
}
