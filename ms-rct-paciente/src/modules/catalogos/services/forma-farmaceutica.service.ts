/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { FormaFarmaceuticaRepository } from '../repositories/forma-farmaceutica.repository';

@Injectable()
export class FormaFarmaceuticaService {
  constructor(
    @InjectRepository(FormaFarmaceuticaRepository)
    private readonly formaFarmaceuticaRepository: FormaFarmaceuticaRepository,
  ) {}

  async getFormaFarmaceuticaPorId(id: number) {
    const formaFarmaceutica = await this.formaFarmaceuticaRepository
      .getFormaFarmaceuticaPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!formaFarmaceutica)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Forma farmacéutica '${id}' no encontrado`,
      });
    return formaFarmaceutica;
  }

  async getFormaFarmaceuticaTodos() {
    const formaFarmaceutica = await this.formaFarmaceuticaRepository
      .getFormaFarmaceuticaTodos()
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    return formaFarmaceutica;
  }
}
