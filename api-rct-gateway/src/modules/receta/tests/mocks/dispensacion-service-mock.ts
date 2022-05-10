import { plainToClass } from 'class-transformer';

import {
  CreateDispensacionDto,
  ReadDispensacionDto,
} from '../../dto/dispensacion.dto';
import { DataTest } from './data-test';

export class DispensacionServiceMock {
  async createDispensacion(
    createDispensacionDto: CreateDispensacionDto,
  ): Promise<any> {
    const data = DataTest.DATA_DISPENSACION;
    const resultado = plainToClass(ReadDispensacionDto, data);
    return Promise.resolve(resultado);
  }
}
