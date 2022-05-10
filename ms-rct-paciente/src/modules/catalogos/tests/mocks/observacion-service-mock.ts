import { plainToClass } from 'class-transformer';

import { Observacion } from '../../entities/observacion.entity';
import { DataTest } from './data-test';

export class ObservacionServiceMock {
  async getObservacionPorId(id: number) {
    const resultado = plainToClass(Observacion, DataTest.DATA_OBSERVACION);
    return Promise.resolve(resultado);
  }
}
