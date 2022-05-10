/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { ConcentracionRepository } from '../repositories/concentracion.repository';

@Injectable()
export class ConcentracionService {
  constructor(
    @InjectRepository(ConcentracionRepository)
    private readonly concentracionRepository: ConcentracionRepository,
  ) {}

  async getConcentracionPorId(id: number) {
    const concentracion = await this.concentracionRepository
      .getConcentracionPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!concentracion)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Concentración '${id}' no encontrado`,
      });
    return concentracion;
  }

  async getConcentracionTodos() {
    const lconcentracion = await this.concentracionRepository
      .getConcentracionTodos()
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });

    return lconcentracion;
  }
}
