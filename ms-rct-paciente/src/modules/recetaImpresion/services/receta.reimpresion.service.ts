/**
 * @ Author: Roberto Maldonado
 * @ Create Time: 2022-05-03 16:50:00
 * @ Description:
 */
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { RecetaReImpRepository } from '../repositories/receta-impresion.repository';

@Injectable()
export class RecetaReImpService {
  constructor(
    @InjectRepository(RecetaReImpRepository)
    private readonly recetaReImpRepository: RecetaReImpRepository,
  ) {}

  async getRecetaActivaTodos(Identificador: number) {
    const lrecetaRImp = await this.recetaReImpRepository
      .getRecetaActivaTodos(Identificador)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!lrecetaRImp)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Registro '${Identificador}' no encontrado`,
      });

    return lrecetaRImp;
  }
}
