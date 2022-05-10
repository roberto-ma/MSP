/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { InteraccionesRepository } from '../repositories/interacciones.repository';

@Injectable()
export class InteraccionesService {
  constructor(
    @InjectRepository(InteraccionesRepository)
    private readonly interaccionesRepository: InteraccionesRepository,
  ) {}

  async getInteraccionesPorId(id: number) {
    const interacciones = await this.interaccionesRepository
      .getInteraccionesPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!interacciones)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Interacción '${id}' no encontrada`,
      });
    return interacciones;
  }
}
