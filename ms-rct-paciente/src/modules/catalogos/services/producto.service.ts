/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { ProductoRepository } from '../repositories/producto.repository';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductoRepository)
    private readonly productoRepository: ProductoRepository,
  ) {}

  async getProductoPorId(id: number) {
    const producto = await this.productoRepository
      .getProductoPorId(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `${error.message}`,
        });
      });
    if (!producto)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Producto '${id}' no encontrado`,
      });
    return producto;
  }
}
