/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { IndicacionesCnmbRepository } from '../repositories/indicaciones-cnmb.repository';

@Injectable()
export class IndicacionesCnmbService {
  constructor(
    @InjectRepository(IndicacionesCnmbRepository)
    private readonly indicacionesCnmbRepository: IndicacionesCnmbRepository,
  ) {}

  async getIndicacionesCnmbPorId(id: number) {
    const indicacionesCnmb = await this.indicacionesCnmbRepository
      .getIndicacionesCnmbPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!indicacionesCnmb)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Indicaciones '${id}' no encontrado`,
      });
    return indicacionesCnmb;
  }
}
