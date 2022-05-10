import { plainToClass } from 'class-transformer';

import { RegistroTerapeutico } from '../../entities/registro-terapeutico.entity';
import { DataTest } from './data-test';

export class RegistroTerapeuticoServiceMock {
  async getRegistroTerapeuticoPorId(id: number) {
    const resultado = plainToClass(
      RegistroTerapeutico,
      DataTest.DATA_REGISTRO_TERAPEUTICO,
    );
    return Promise.resolve(resultado);
  }
}
