import { plainToClass } from 'class-transformer';

import { Frecuencia } from '../../entities/frecuencia.entity';
import { DataTest } from './data-test';

export class FrecuenciaServiceMock {
  async getFrecuenciaPorId(id: number) {
    const resultado = plainToClass(Frecuencia, DataTest.DATA_FRECUENCIA);
    return Promise.resolve(resultado);
  }

  async getFrecuenciaTodos() {
    const resultado = plainToClass(Frecuencia, DataTest.DATA_FRECUENCIA);
    return Promise.resolve([resultado]);
  }
}
