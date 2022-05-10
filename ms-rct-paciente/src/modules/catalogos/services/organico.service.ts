/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { OrganicoRepository } from '../repositories/organico.repository';

@Injectable()
export class OrganicoService {
  constructor(
    @InjectRepository(OrganicoRepository)
    private readonly organicoRepository: OrganicoRepository,
  ) {}

  async getOrganicoPorId(id: number) {
    const organico = await this.organicoRepository
      .getOrganicoPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!organico)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Orgánico '${id}' no encontrado`,
      });
    return organico;
  }

  async getOrganicoPorCodigoCircuito(codigoCircuito: string) {
    const organico = await this.organicoRepository
      .getOrganicoPorCodigoCircuito(codigoCircuito)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!organico)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Orgánico '${codigoCircuito}' no encontrado`,
      });
    return organico;
  }
}
