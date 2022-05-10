import { plainToClass } from 'class-transformer';

import { Medicamento } from '../../entities/medicamento.entity';
import { DataTest } from './data-test';

export class MedicamentoServiceMock {
  async getMedicamentoPorId(id: number) {
    const resultado = plainToClass(Medicamento, DataTest.DATA_MEDICAMENTO);
    return Promise.resolve(resultado);
  }

  async getMedicamentosPorCum(cum: string) {
    const resultado = plainToClass(Medicamento, DataTest.DATA_MEDICAMENTO);
    return Promise.resolve(resultado);
  }

  async getMedicamentosPorAct(cum: string) {
    const resultado = plainToClass(Medicamento, DataTest.DATA_MEDICAMENTO);
    return Promise.resolve(resultado);
  }
}
