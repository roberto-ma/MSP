/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { EstablecimientoRepository } from '../repositories/establecimiento.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class EstablecimientoService {
  constructor(
    @InjectRepository(EstablecimientoRepository)
    private readonly establecimientoRepository: EstablecimientoRepository,
  ) {}

  async getEstablecimientoPorId(id: number) {
    const establecimiento = await this.getEstablecimientoPorIdSimple(id);
    if (!establecimiento)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Establecimiento '${id}' no encontrado`,
      });
    return establecimiento;
  }

  async getEstablecimientoPorIdSimple(id: number) {
    return await this.establecimientoRepository
      .getEstablecimientoPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
  }

  async getEstablecimientoPorUniCodigo(unicodigo: string) {
    const establecimiento = await this.establecimientoRepository
      .getEstablecimientoPorUniCodigo(unicodigo)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!establecimiento)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Establecimiento '${unicodigo}' no encontrado`,
      });
    return establecimiento;
  }

  async getEstablecimientoPorRuc(ruc: string) {
    const establecimiento = await this.establecimientoRepository
      .getEstablecimientoPorRuc(ruc)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!establecimiento)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Establecimiento '${ruc}' no encontrado`,
      });
    return establecimiento;
  }
}
