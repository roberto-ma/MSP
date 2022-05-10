import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { RecetaFarmaciaRepository } from '../../recetaFarmacia/repositories/recetaFarmacia.repository';
import { number } from 'joi';

@Injectable()
export class RecetaImpFarmaciaService {
  constructor(
    @InjectRepository(RecetaFarmaciaRepository)
    private readonly recetaRepository: RecetaFarmaciaRepository,
  ) {}

  async getRecetaPorN(id: number) {
    const receta = await this.recetaRepository
      .getRecetaPorN(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      });
    if (!receta)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Registro '${id}' no encontrado`,
      });
    return receta;
  }
}
