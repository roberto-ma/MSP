/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { DosisMedidaRepository } from '../repositories/dosis-medida.repository';

@Injectable()
export class DosisMedidaService {
  constructor(
    @InjectRepository(DosisMedidaRepository)
    private readonly dosisMedidaRepository: DosisMedidaRepository,
  ) {}

  async getDosisMedidaPorId(id: number) {
    const dosisMedida = await this.dosisMedidaRepository
      .getDosisMedidaPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!dosisMedida)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Dosis por medida '${id}' no encontrado`,
      });
    return dosisMedida;
  }

  async getDosisMedidaTodos() {
    const lDosisMedida = await this.dosisMedidaRepository
      .getDosisMedidaTodos()
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    return lDosisMedida;
  }
}
