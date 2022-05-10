/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { NivelPrescripcionRepository } from '../repositories/nivel-prescripcion.repository';

@Injectable()
export class NivelPrescripcionService {
  constructor(
    @InjectRepository(NivelPrescripcionRepository)
    private readonly nivelPrescripcionRepository: NivelPrescripcionRepository,
  ) {}

  async getNivelPrescripcionPorId(id: number) {
    const nivelPrescripcion = await this.nivelPrescripcionRepository
      .getNivelPrescripcionPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!nivelPrescripcion)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Nivel de prescripción '${id}' no encontrado`,
      });
    return nivelPrescripcion;
  }

  async getNivelPrescripcionTodos() {
    const NivelPrescripcion = await this.nivelPrescripcionRepository
      .getNivelPrescripcionTodos()
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    return NivelPrescripcion;
  }
}
