import { plainToClass } from 'class-transformer';

import { Dosificacion } from '../../entities/dosificacion.entity';
import { DataTest } from './data-test';

export class DosificacionServiceMock {
  async getDosificacionPorId(id: number) {
    const resultado = plainToClass(Dosificacion, DataTest.DATA_DOSIFICACION);
    return Promise.resolve(resultado);
  }
}
