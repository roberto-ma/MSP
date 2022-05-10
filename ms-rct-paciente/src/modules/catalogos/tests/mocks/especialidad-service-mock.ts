import { plainToClass } from 'class-transformer';

import { Especialidad } from '../../entities/especialidad.entity';
import { DataTest } from './data-test';

export class EspecialidadServiceMock {
  async getEspecialidadPorId(id: number) {
    const resultado = plainToClass(Especialidad, DataTest.DATA_ESPECIALIDAD);
    return Promise.resolve(resultado);
  }
}
