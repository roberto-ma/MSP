import { plainToClass } from 'class-transformer';

import { Interacciones } from '../../entities/interacciones.entity';
import { DataTest } from './data-test';

export class InteraccionesServiceMock {
  async getInteraccionesPorId(id: number) {
    const resultado = plainToClass(Interacciones, DataTest.DATA_INTERACCION);
    return Promise.resolve(resultado);
  }
}
