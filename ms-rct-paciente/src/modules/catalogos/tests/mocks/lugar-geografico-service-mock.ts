import { plainToClass } from 'class-transformer';

import { LugarGeografico } from '../../entities/lugar-geografico.entity';
import { DataTest } from './data-test';

export class LugarGeograficoServiceMock {
  async getLugarGeograficoPorId(id: number) {
    const resultado = plainToClass(
      LugarGeografico,
      DataTest.DATA_LUGAR_GEOGRAFICO,
    );
    return Promise.resolve(resultado);
  }

  async getLugarGeograficoPorCodigoPras(codigoPras: string) {
    const resultado = plainToClass(
      LugarGeografico,
      DataTest.DATA_LUGAR_GEOGRAFICO,
    );
    return Promise.resolve(resultado);
  }
}
