import { plainToClass } from 'class-transformer';

import { TipoLabAnalisisClinico } from '../../entities/tipo-lab-analisis-clinico.entity';
import { DataTest } from './data-test';

export class TipoLabAnalisisClinicoServiceMock {
  async getTipoLabAnalisisClinicoPorId(id: number) {
    const resultado = plainToClass(
      TipoLabAnalisisClinico,
      DataTest.DATA_TIPO_LAB_ANALISIS_CLINICO,
    );
    return Promise.resolve(resultado);
  }
}
