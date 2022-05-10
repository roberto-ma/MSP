import { plainToClass } from 'class-transformer';
import { CadenaFarmacia } from '../../entities/cadena-farmacia.entity';
import { DataTest } from './data-test';

export class CadenaFarmaciaServiceMock {
  async getCadenaFarmaciaPorId(id: number) {
    const resultado = plainToClass(
      CadenaFarmacia,
      DataTest.DATA_CADENA_FARMACIA,
    );
    return Promise.resolve(resultado);
  }
}
