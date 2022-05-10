import { plainToClass } from 'class-transformer';

import { Etnia } from '../../entities/etnia.entity';
import { DataTest } from './data-test';

export class EtniaServiceMock {
  async getEtniaPorId(id: number) {
    const resultado = plainToClass(Etnia, DataTest.DATA_ETNIA);
    return Promise.resolve(resultado);
  }

  async getEtniaPorCodigoPras(codigoPras: string) {
    const resultado = plainToClass(Etnia, DataTest.DATA_ETNIA);
    return Promise.resolve(resultado);
  }

  async getEtniaTodos() {
    const resultado = plainToClass(Etnia, DataTest.DATA_ETNIA);
    return Promise.resolve([resultado]);
  }
}
