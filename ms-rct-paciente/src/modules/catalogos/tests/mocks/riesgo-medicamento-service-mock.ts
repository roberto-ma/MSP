import { plainToClass } from 'class-transformer';

import { RiesgoMedicamento } from '../../entities/riesgomedicamento.entity';
import { DataTest } from './data-test';

export class RiesgoMedicamentoServiceMock {
  async getRiesgoMedicamentoPorId(id: number) {
    const resultado = plainToClass(
      RiesgoMedicamento,
      DataTest.DATA_RIESGO_MEDICAMENTO,
    );
    return Promise.resolve(resultado);
  }

  async getRiesgoMedicamentoTodos() {
    const resultado = plainToClass(
      RiesgoMedicamento,
      DataTest.DATA_RIESGO_MEDICAMENTO,
    );
    return Promise.resolve([resultado]);
  }
}
