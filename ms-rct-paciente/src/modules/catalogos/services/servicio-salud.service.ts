/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { ServicioSaludRepository } from '../repositories/servicio-salud.repository';

@Injectable()
export class ServicioSaludService {
  constructor(
    @InjectRepository(ServicioSaludRepository)
    private readonly servicioSaludRepository: ServicioSaludRepository,
  ) {}

  async getServicioSaludPorId(id: number) {
    const servicioSalud = await this.servicioSaludRepository
      .getServicioSaludPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!servicioSalud)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Servicio salud '${id}' no encontrado`,
      });
    return servicioSalud;
  }
}
