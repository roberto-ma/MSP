/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { RolProfesionalRepository } from '../repositories/rol-profesional.repository';

@Injectable()
export class RolProfesionalService {
  constructor(
    @InjectRepository(RolProfesionalRepository)
    private readonly rolProfesionalRepository: RolProfesionalRepository,
  ) {}

  async getRolProfesionalPorId(id: number) {
    const rolProfesional = await this.rolProfesionalRepository
      .getRolProfesionalPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!rolProfesional)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Rol profesional '${id}' no encontrado`,
      });
    return rolProfesional;
  }

  async getRolProfesionalTodos() {
    const rolProfesional = await this.rolProfesionalRepository
      .getRolProfesionalTodos()
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    return rolProfesional;
  }
}
