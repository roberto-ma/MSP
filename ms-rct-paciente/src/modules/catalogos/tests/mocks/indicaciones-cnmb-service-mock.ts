import { plainToClass } from 'class-transformer';

import { IndicacionesCnmb } from '../../entities/indicaciones-cnmb.entity';
import { DataTest } from './data-test';

export class IndicacionesCnmbServiceMock {
  async getIndicacionesCnmbPorId(id: number) {
    const resultado = plainToClass(
      IndicacionesCnmb,
      DataTest.DATA_INDICACIONES_CNMB,
    );
    return Promise.resolve(resultado);
  }
}
