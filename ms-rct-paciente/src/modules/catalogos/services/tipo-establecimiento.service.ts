/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { TipoEstablecimientoRepository } from '../repositories/tipo-establecimiento.repository';

@Injectable()
export class TipoEstablecimientoService {
  constructor(
    @InjectRepository(TipoEstablecimientoRepository)
    private readonly tipoEstablecimientoRepository: TipoEstablecimientoRepository,
  ) {}

  async getTipoEstablecimientoPorId(id: number) {
    const tipoEstablecimiento = await this.tipoEstablecimientoRepository
      .getTipoEstablecimientoPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!tipoEstablecimiento)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Tipo establecimiento '${id}' no encontrado`,
      });
    return tipoEstablecimiento;
  }
}
