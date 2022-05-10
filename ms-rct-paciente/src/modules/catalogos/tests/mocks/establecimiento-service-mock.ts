import { plainToClass } from 'class-transformer';

import { Establecimiento } from '../../entities/establecimiento.entity';
import { DataTest } from './data-test';

export class EstablecimientoServiceMock {
  async getEstablecimientoPorId(id: number) {
    const resultado = plainToClass(
      Establecimiento,
      DataTest.DATA_ESTABLECIMIENTO,
    );
    return Promise.resolve(resultado);
  }

  async getEstablecimientoPorUniCodigo(unicodigo: string) {
    const resultado = plainToClass(
      Establecimiento,
      DataTest.DATA_ESTABLECIMIENTO,
    );
    return Promise.resolve(resultado);
  }

  async getEstablecimientoPorRuc(ruc: string) {
    const resultado = plainToClass(
      Establecimiento,
      DataTest.DATA_ESTABLECIMIENTO,
    );
    return Promise.resolve(resultado);
  }
}
