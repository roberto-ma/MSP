import { plainToClass } from 'class-transformer';

import { Farmacia } from '../../entities/farmacia.entity';
import { DataTest } from './data-test';

export class FarmaciaServiceMock {
  async getFarmaciaPorId(id: number) {
    const resultado = plainToClass(Farmacia, DataTest.DATA_FARMACIA);
    return Promise.resolve(resultado);
  }

  async getFarmaciaPorRuc(ruc: string) {
    const resultado = plainToClass(Farmacia, DataTest.DATA_FARMACIA);
    return Promise.resolve(resultado);
  }
}
