import { plainToClass } from 'class-transformer';
import { Cie } from '../../entities/cie.entity';
import { DataTest } from './data-test';

export class CieServiceMock {
  async getCiePorId(id: number) {
    const resultado = plainToClass(Cie, DataTest.DATA_CIE);
    return Promise.resolve(resultado);
  }

  async getCiePorCodigo(codigoCie: string) {
    const resultado = plainToClass(Cie, DataTest.DATA_CIE);
    return Promise.resolve(resultado);
  }
}
