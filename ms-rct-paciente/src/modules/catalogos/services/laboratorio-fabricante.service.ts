/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { LaboratorioFabricanteRepository } from '../repositories/laboratorio-fabricante.repository';

@Injectable()
export class LaboratorioFabricanteService {
  constructor(
    @InjectRepository(LaboratorioFabricanteRepository)
    private readonly laboratorioFabricanteRepository: LaboratorioFabricanteRepository,
  ) {}

  async getLaboratorioFabricantePorId(id: number) {
    const laboratorioFabricante = await this.laboratorioFabricanteRepository
      .getLaboratorioFabricantePorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!laboratorioFabricante)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Laboratorio '${id}' no encontrado`,
      });
    return laboratorioFabricante;
  }
}
