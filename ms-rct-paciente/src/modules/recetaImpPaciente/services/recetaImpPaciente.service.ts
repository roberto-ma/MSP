/**
 * @ Author: Roberto Maldonado
 * @ Create Time: 2022-05-03 16:50:00
 * @ Description:
 */
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { RecetaRepository } from '../../recetaImpPaciente/repositories/recetaImpPaciente';

@Injectable()
export class RecetaImpPacienteService {
  constructor(
    @InjectRepository(RecetaRepository)
    private readonly recetaRepository: RecetaRepository,
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
