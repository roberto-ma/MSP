/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { RegistroTerapeuticoRepository } from '../repositories/registro-terapeutico.repository';

@Injectable()
export class RegistroTerapeuticoService {
  constructor(
    @InjectRepository(RegistroTerapeuticoRepository)
    private readonly registroTerapeuticoRepository: RegistroTerapeuticoRepository,
  ) {}

  async getRegistroTerapeuticoPorId(id: number) {
    const registroTerapeutico = await this.registroTerapeuticoRepository
      .getRegistroTerapeuticoPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!registroTerapeutico)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Registro terapeutico '${id}' no encontrado`,
      });
    return registroTerapeutico;
  }
}
