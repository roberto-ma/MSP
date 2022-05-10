import { plainToClass } from 'class-transformer';

import { Estado } from '../../entities/estadoreceta.entity';
import { DataTest } from './data-test';

export class EstadoServiceMock {
  async getEstadoPorId(id: number) {
    const resultado = plainToClass(Estado, DataTest.DATA_ESTADO_RECETA);
    return Promise.resolve(resultado);
  }

  async getEstadoTodos() {
    const resultado = plainToClass(Estado, DataTest.DATA_ESTADO_RECETA);
    return Promise.resolve([resultado]);
  }
}
