/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { FarmaciaRepository } from '../repositories/farmacia.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class FarmaciaService {
  constructor(
    @InjectRepository(FarmaciaRepository)
    private readonly farmaciaRepository: FarmaciaRepository,
  ) {}

  async getFarmaciaPorId(id: number) {
    const farmacia = await this.farmaciaRepository
      .getFarmaciaPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!farmacia)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Farmacia '${id}' no encontrada`,
      });
    return farmacia;
  }

  async getFarmaciaPorRuc(ruc: string) {
    const farmacia = await this.farmaciaRepository
      .getFarmaciaPorRuc(ruc)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!farmacia)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Farmacia '${ruc}' no encontrada`,
      });
    return farmacia;
  }
}
