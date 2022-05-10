import { plainToClass } from 'class-transformer';

import { Contraindicacion } from '../../entities/contraindicacion.entity';
import { DataTest } from './data-test';

export class ContraindicacionServiceMock {
  async getContraindicacionPorId(id: number) {
    const resultado = plainToClass(
      Contraindicacion,
      DataTest.DATA_CONTRAINDICACION,
    );
    return Promise.resolve(resultado);
  }
}
