/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { EstadoRepository } from '../repositories/estado.repository';

@Injectable()
export class EstadoService {
  constructor(
    @InjectRepository(EstadoRepository)
    private readonly estadoRepository: EstadoRepository,
  ) {}

  async getEstadoPorId(id: number) {
    const estado = await this.estadoRepository
      .getEstadoPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!estado)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Estado '${id}' no encontrado`,
      });
    return estado;
  }

  async getEstadoTodos() {
    const lEstado = await this.estadoRepository
      .getEstadoTodos()
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    return lEstado;
  }
}
