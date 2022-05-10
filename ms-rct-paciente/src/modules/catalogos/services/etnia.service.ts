/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { EtniaRepository } from '../repositories/etnia.repository';

@Injectable()
export class EtniaService {
  constructor(
    @InjectRepository(EtniaRepository)
    private readonly etniaRepository: EtniaRepository,
  ) {}

  async getEtniaPorId(id: number) {
    const etnia = await this.etniaRepository
      .getEtniaPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!etnia)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Etnia '${id}' no encontrada`,
      });
    return etnia;
  }

  async getEtniaPorCodigoPras(codigoPras: string) {
    const etnia = await this.etniaRepository
      .getEtniaPorCodigoPras(codigoPras)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    return etnia;
  }

  async getEtniaTodos() {
    const lEtnia = await this.etniaRepository
      .getEstadoTodos()
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    return lEtnia;
  }
}
