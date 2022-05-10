import { plainToClass } from 'class-transformer';

import { FormaFarmaceutica } from '../../entities/forma-farmaceutica.entity';
import { DataTest } from './data-test';

export class FormaFarmaceuticaServiceMock {
  async getFormaFarmaceuticaPorId(id: number) {
    const resultado = plainToClass(
      FormaFarmaceutica,
      DataTest.DATA_FORMA_FARMACEUTICA,
    );
    return Promise.resolve(resultado);
  }

  async getFormaFarmaceuticaTodos() {
    const resultado = plainToClass(
      FormaFarmaceutica,
      DataTest.DATA_FORMA_FARMACEUTICA,
    );
    return Promise.resolve([resultado]);
  }
}
