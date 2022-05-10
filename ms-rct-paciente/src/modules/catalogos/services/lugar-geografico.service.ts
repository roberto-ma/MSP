/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { LugarGeograficoRepository } from '../repositories/lugar-geografico.repository';

@Injectable()
export class LugarGeograficoService {
  constructor(
    @InjectRepository(LugarGeograficoRepository)
    private readonly lugarGeograficoRepository: LugarGeograficoRepository,
  ) {}

  async getLugarGeograficoPorId(id: number) {
    const lugarGeografico = await this.lugarGeograficoRepository
      .getLugarGeograficoPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!lugarGeografico)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Lugar geográfico '${id}' no encontrado`,
      });
    return lugarGeografico;
  }

  async getLugarGeograficoPorCodigoPras(codigoPras: string) {
    const lugarGeografico = await this.lugarGeograficoRepository
      .getLugarGeograficoPorCodigoPras(codigoPras)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!lugarGeografico)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Lugar geográfico '${codigoPras}' no encontrado`,
      });
    return lugarGeografico;
  }
}
