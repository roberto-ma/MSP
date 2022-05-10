import { plainToClass } from 'class-transformer';

import { Tarifario } from '../../entities/tarifario.entity';
import { DataTest } from './data-test';

export class TarifarioServiceMock {
  async getTarifarioPorProductId(productoId: number) {
    const resultado = plainToClass(Tarifario, DataTest.DATA_TARIFARIO);
    return Promise.resolve(resultado);
  }
}
