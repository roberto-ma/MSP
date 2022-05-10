/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { InstitucionRepository } from '../repositories/institucion.repository';

@Injectable()
export class InstitucionService {
  constructor(
    @InjectRepository(InstitucionRepository)
    private readonly institucionRepository: InstitucionRepository,
  ) {}

  async getInstitucionPorId(id: number) {
    const institucion = await this.institucionRepository
      .getInstitucionPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!institucion)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Institución '${id}' no encontrado`,
      });
    return institucion;
  }
}
