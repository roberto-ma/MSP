/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { FrecuenciaRepository } from '../repositories/frecuencia.repository';

@Injectable()
export class FrecuenciaService {
  constructor(
    @InjectRepository(FrecuenciaRepository)
    private readonly frecuenciaRepository: FrecuenciaRepository,
  ) {}

  async getFrecuenciaPorId(id: number) {
    const frecuencia = await this.frecuenciaRepository
      .getFrecuenciaPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!frecuencia)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Frecuencia '${id}' no encontrado`,
      });
    return frecuencia;
  }

  async getFrecuenciaTodos() {
    const lFrecuencia = await this.frecuenciaRepository
      .getFrecuenciaTodos()
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    return lFrecuencia;
  }
}
