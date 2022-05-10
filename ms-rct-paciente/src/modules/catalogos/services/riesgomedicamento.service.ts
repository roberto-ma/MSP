/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { RiesgoMedicamentoRepository } from '../repositories/riesgomedicamento.repository';

@Injectable()
export class RiesgoMedicamentoService {
  constructor(
    @InjectRepository(RiesgoMedicamentoRepository)
    private readonly riesgoMedicamentoRepository: RiesgoMedicamentoRepository,
  ) {}

  async getRiesgoMedicamentoPorId(id: number) {
    const riesgoMedicamento = await this.riesgoMedicamentoRepository
      .getRiesgoMedicamentoPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!riesgoMedicamento)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Nivel riesgo '${id}' no encontrado`,
      });
    return riesgoMedicamento;
  }

  async getRiesgoMedicamentoTodos() {
    const riesgoMedicamento = await this.riesgoMedicamentoRepository
      .getRiesgoMedicamentoTodos()
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    return riesgoMedicamento;
  }
}
