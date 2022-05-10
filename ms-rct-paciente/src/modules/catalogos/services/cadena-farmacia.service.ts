import { Injectable, HttpStatus } from '@nestjs/common';
import { CadenaFarmaciaRepository } from '../repositories/cadena-farmacia.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CadenaFarmaciaService {
  constructor(
    @InjectRepository(CadenaFarmaciaRepository)
    private readonly cadenaFarmaciaRepository: CadenaFarmaciaRepository,
  ) {}

  async getCadenaFarmaciaPorId(id: number) {
    const cadenaFarmacia = await this.cadenaFarmaciaRepository
      .getCadenaFarmaciaPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!cadenaFarmacia)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `CadenaFarmacia '${id}' no encontrado`,
      });
    if (!cadenaFarmacia?.llaveCriptografia)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `LLave para la cadena farmacia '${id}' no encontrada`,
      });
    return cadenaFarmacia;
  }
}
