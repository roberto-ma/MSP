/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { FuenteDatosRepository } from '../repositories/fuente-datos.repository';

@Injectable()
export class FuenteDatosService {
  constructor(
    @InjectRepository(FuenteDatosRepository)
    private readonly fuenteDatosRepository: FuenteDatosRepository,
  ) {}

  async getFuenteDatosPorId(id: number) {
    const fuenteDatos = await this.fuenteDatosRepository
      .getFuenteDatosPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!fuenteDatos)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Fuente de datos '${id}' no encontrado`,
      });
    if (!fuenteDatos?.llaveCriptografia)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `LLave de fuente de datos '${id}' no encontrado`,
      });
    return fuenteDatos;
  }

  async getFuenteDatosTodos() {
    const lFuenteDatos = await this.fuenteDatosRepository
      .getFuenteDatosTodos()
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    return lFuenteDatos;
  }
}
