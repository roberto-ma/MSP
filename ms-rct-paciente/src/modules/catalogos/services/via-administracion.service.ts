/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { ViaAdministracionRepository } from '../repositories/via-administracion.repository';

@Injectable()
export class ViaAdministracionService {
  constructor(
    @InjectRepository(ViaAdministracionRepository)
    private readonly viaAdministracionRepository: ViaAdministracionRepository,
  ) {}

  async getViaAdministracionPorId(id: number) {
    const viaAdministracion = await this.viaAdministracionRepository
      .getViaAdministracionPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!viaAdministracion)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Vía de admisión '${id}' no encontrado`,
      });
    return viaAdministracion;
  }

  async getViaAdministracionTodos() {
    const viaAdministracion = await this.viaAdministracionRepository
      .getViaAdministracionTodos()
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    return viaAdministracion;
  }
}
