import { plainToClass } from 'class-transformer';

import { LaboratorioFabricante } from '../../entities/laboratorio-fabricante.entity';
import { DataTest } from './data-test';

export class LaboratorioFabricanteServiceMock {
  async getLaboratorioFabricantePorId(id: number) {
    const resultado = plainToClass(
      LaboratorioFabricante,
      DataTest.DATA_LABORATORIO_FABRICANTE,
    );
    return Promise.resolve(resultado);
  }
}
