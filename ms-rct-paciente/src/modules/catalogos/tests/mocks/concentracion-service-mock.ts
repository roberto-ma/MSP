import { plainToClass } from 'class-transformer';

import { Concentracion } from '../../entities/concentracion.entity';
import { DataTest } from './data-test';

export class ConcentracionServiceMock {
  async getConcentracionPorId(id: number) {
    const resultado = plainToClass(Concentracion, DataTest.DATA_CONCENTRACION);
    return Promise.resolve(resultado);
  }

  async getConcentracionTodos() {
    const resultado = plainToClass(Concentracion, DataTest.DATA_CONCENTRACION);
    return Promise.resolve([resultado]);
  }
}
