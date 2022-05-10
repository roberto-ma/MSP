/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { EspecialidadRepository } from '../repositories/especialidad.repository';

@Injectable()
export class EspecialidadService {
  constructor(
    @InjectRepository(EspecialidadRepository)
    private readonly especialidadRepository: EspecialidadRepository,
  ) {}

  async getEspecialidadPorId(id: number) {
    const especialidad = await this.especialidadRepository
      .getEspecialidadPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!especialidad)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Espacielidad '${id}' no encontrada`,
      });
    return especialidad;
  }
}
