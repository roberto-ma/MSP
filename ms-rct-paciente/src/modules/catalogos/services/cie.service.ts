/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { CieRepository } from '../repositories/cie.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CieService {
  constructor(
    @InjectRepository(CieRepository)
    private readonly cieRepository: CieRepository,
  ) {}

  async getCiePorId(id: number) {
    const cie = await this.cieRepository.getCiePorId(id).catch((error) => {
      throw new RpcException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `${error.message}`,
      });
    });
    if (!cie)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Cie '${id}' no encontrado`,
      });
    return cie;
  }

  async getCiePorCodigo(codigoCie: string) {
    const cie = await this.cieRepository
      .getCiePorCodigo(codigoCie)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!cie)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Cie '${codigoCie}' no encontrado`,
      });
    return cie;
  }
}
