import { Injectable, HttpStatus } from '@nestjs/common';
import { TarifarioRepository } from '../repositories/tarifario.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TarifarioService {
  constructor(
    @InjectRepository(TarifarioRepository)
    private readonly tarifarioRepository: TarifarioRepository,
  ) {}

  async getTarifarioPorProductId(productoId: number) {
    const tarifario = await this.tarifarioRepository
      .getTarifarioPorProductId(productoId)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!tarifario)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Medicamento/producto '${productoId}' no encontrado en el tarifario`,
      });
    return tarifario;
  }
}
