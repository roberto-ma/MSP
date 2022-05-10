/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { TipoLabAnalisisClinicoRepository } from '../repositories/tipo-lab-analisis-clinico.repository';

@Injectable()
export class TipoLabAnalisisClinicoService {
  constructor(
    @InjectRepository(TipoLabAnalisisClinicoRepository)
    private readonly tipoLabAnalisisClinicoRepository: TipoLabAnalisisClinicoRepository,
  ) {}

  async getTipoLabAnalisisClinicoPorId(id: number) {
    const tipoLabAnalisisClinico = await this.tipoLabAnalisisClinicoRepository
      .getTipoLabAnalisisClinicoPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!tipoLabAnalisisClinico)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Tipo análisis clínico '${id}' no encontrado`,
      });
    return tipoLabAnalisisClinico;
  }
}
