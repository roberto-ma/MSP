import { plainToClass } from 'class-transformer';

import { NivelPrescripcion } from '../../entities/nivel-prescripcion.entity';
import { DataTest } from './data-test';

export class NivelPrescripcionServiceMock {
  async getNivelPrescripcionPorId(id: number) {
    const resultado = plainToClass(
      NivelPrescripcion,
      DataTest.DATA_NIVEL_PRESCRIPCION,
    );
    return Promise.resolve(resultado);
  }

  async getNivelPrescripcionTodos() {
    const resultado = plainToClass(
      NivelPrescripcion,
      DataTest.DATA_NIVEL_PRESCRIPCION,
    );
    return Promise.resolve([resultado]);
  }
}
