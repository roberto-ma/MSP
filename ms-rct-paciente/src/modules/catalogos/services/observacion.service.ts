/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { ObservacionRepository } from '../repositories/observacion.repository';

@Injectable()
export class ObservacionService {
  constructor(
    @InjectRepository(ObservacionRepository)
    private readonly observacionRepository: ObservacionRepository,
  ) {}

  async getObservacionPorId(id: number) {
    const observacion = await this.observacionRepository
      .getObservacionPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!observacion)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Observación '${id}' no encontrado`,
      });
    return observacion;
  }
}
