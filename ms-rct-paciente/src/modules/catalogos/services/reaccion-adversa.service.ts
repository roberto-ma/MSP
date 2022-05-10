/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { ReaccionAdversaRepository } from '../repositories/reaccion-adversa.repository';

@Injectable()
export class ReaccionAdversaService {
  constructor(
    @InjectRepository(ReaccionAdversaRepository)
    private readonly reaccionAdversaRepository: ReaccionAdversaRepository,
  ) {}

  async getReaccionAdversaPorId(id: number) {
    const reaccionAdversa = await this.reaccionAdversaRepository
      .getReaccionAdversaPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!reaccionAdversa)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Reacción adversa '${id}' no encontrado`,
      });
    return reaccionAdversa;
  }
}
