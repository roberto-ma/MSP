import { plainToClass } from 'class-transformer';
import { Cie } from '../../entities/cie.entity';
import { DosisMedida } from '../../entities/dosis-medida.entity';
import { DataTest } from './data-test';

export class DosisMedidaServiceMock {
  async getDosisMedidaPorId(id: number) {
    const resultado = plainToClass(DosisMedida, DataTest.DATA_DOSIS_MEDIDA);
    return Promise.resolve(resultado);
  }

  async getDosisMedidaTodos() {
    const resultado = plainToClass(DosisMedida, DataTest.DATA_DOSIS_MEDIDA);
    return Promise.resolve([resultado]);
  }
}
