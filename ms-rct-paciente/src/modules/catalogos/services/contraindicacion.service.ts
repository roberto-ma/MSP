/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { ContraindicacionRepository } from '../repositories/contraindicacion.repository';

@Injectable()
export class ContraindicacionService {
  constructor(
    @InjectRepository(ContraindicacionRepository)
    private readonly contraindicacionRepository: ContraindicacionRepository,
  ) {}

  async getContraindicacionPorId(id: number) {
    const contraindicacion = await this.contraindicacionRepository
      .getContraindicacionPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!contraindicacion)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Contraindicación '${id}' no encontrado`,
      });
    return contraindicacion;
  }

  async getContraindicacionTodos() {
    const lContraindicacion = await this.contraindicacionRepository
      .getContraindicacionTodos()
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    return lContraindicacion;
  }
}
