import { plainToClass } from 'class-transformer';

import { Producto } from '../../entities/producto.entity';
import { DataTest } from './data-test';

export class ProductoServiceMock {
  async getProductoPorId(id: number) {
    const resultado = plainToClass(Producto, DataTest.DATA_PRODUCTO);
    return Promise.resolve(resultado);
  }
}
