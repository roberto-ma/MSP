import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { ProfsaludEstablecimientoRepository } from '../repositories/profsalud-establecimiento.repository';

@Injectable()
export class ProfsaludEstablecimientoService {
  constructor(
    @InjectRepository(ProfsaludEstablecimientoRepository)
    private readonly profsaludEstablecimientoRepository: ProfsaludEstablecimientoRepository,
  ) {}

  async getProfsaludEstablecimientoPorProfesionalId(id: number) {
    const profesionalSalud =
      await this.getProfsaludEstablecimientoPorProfesionalIdSimple(id);
    if (!profesionalSalud)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Establecimientos itinerantes no encontrados para el profesional de salud '${id}'`,
      });
    return profesionalSalud;
  }

  async getProfsaludEstablecimientoPorProfesionalIdSimple(id: number) {
    return await this.profsaludEstablecimientoRepository
      .getProfsaludEstablecimientoPorProfesionalIdER(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      });
  }
}
