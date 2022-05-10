/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { ReligionRepository } from '../repositories/religion.repository';

@Injectable()
export class ReligionService {
  constructor(
    @InjectRepository(ReligionRepository)
    private readonly religionRepository: ReligionRepository,
  ) {}

  async getReligionPorId(id: number) {
    const religion = await this.religionRepository
      .getReligionPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!religion)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Registro religión '${id}' no encontrado`,
      });
    return religion;
  }

  async getReligionPorCodigoPras(codigoPras: string) {
    const religion = await this.religionRepository
      .getReligionPorCodigoPras(codigoPras)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    return religion;
  }

  async getReligionTodos() {
    const lReligion = await this.religionRepository
      .getReligionTodos()
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    return lReligion;
  }
}
