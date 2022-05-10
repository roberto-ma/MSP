import { plainToClass } from 'class-transformer';

import { Presentacion } from '../../entities/presentacion.entity';
import { DataTest } from './data-test';

export class PresentacionServiceMock {
  async getPresentacionPorId(id: number) {
    const resultado = plainToClass(Presentacion, DataTest.DATA_PRESENTACION);
    return Promise.resolve(resultado);
  }
}
