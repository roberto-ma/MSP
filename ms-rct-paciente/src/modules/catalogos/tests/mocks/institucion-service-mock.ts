import { plainToClass } from 'class-transformer';

import { Institucion } from '../../entities/institucion.entity';
import { DataTest } from './data-test';

export class InstitucionServiceMock {
  async getInstitucionPorId(id: number) {
    const resultado = plainToClass(Institucion, DataTest.DATA_INSTITUCION);
    return Promise.resolve(resultado);
  }
}
