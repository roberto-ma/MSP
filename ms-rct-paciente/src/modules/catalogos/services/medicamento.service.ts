/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { MedicamentoRepository } from '../repositories/medicamento.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class MedicamentoService {
  constructor(
    @InjectRepository(MedicamentoRepository)
    private readonly medicamentoRepository: MedicamentoRepository,
  ) {}

  async getMedicamentoPorId(id: number) {
    const medicamento = await this.medicamentoRepository
      .getMedicamentoPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!medicamento)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Medicamento '${id}' no encontrado`,
      });
    return medicamento;
  }

  async getMedicamentosPorCum(cum: string) {
    const medicamento = await this.medicamentoRepository
      .getMedicamentosPorCum(cum)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!medicamento)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Medicamento '${cum}' no encontrado`,
      });
    return medicamento;
  }

  async getMedicamentosPorAct(act: string) {
    const lmedicamento = await this.medicamentoRepository
      .getMedicamentosPorAct(act)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!lmedicamento)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Medicamento '${act}' no encontrado`,
      });
    return lmedicamento;
  }
}
