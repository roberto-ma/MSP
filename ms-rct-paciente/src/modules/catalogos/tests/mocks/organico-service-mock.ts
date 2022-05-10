import { plainToClass } from 'class-transformer';

import { Organico } from '../../entities/organico.entity';
import { DataTest } from './data-test';

export class OrganicoServiceMock {
  async getOrganicoPorId(id: number) {
    const resultado = plainToClass(Organico, DataTest.DATA_ORGANICO);
    return Promise.resolve(resultado);
  }

  async getOrganicoPorCodigoCircuito(codigoCircuito: string) {
    const resultado = plainToClass(Organico, DataTest.DATA_ORGANICO);
    return Promise.resolve(resultado);
  }
}
