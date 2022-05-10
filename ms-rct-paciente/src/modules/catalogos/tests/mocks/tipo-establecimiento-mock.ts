import { plainToClass } from 'class-transformer';

import { TipoEstablecimiento } from '../../entities/tipo-establecimiento.entity';
import { DataTest } from './data-test';

export class TipoEstablecimientoServiceMock {
  async getTipoEstablecimientoPorId(id: number) {
    const resultado = plainToClass(
      TipoEstablecimiento,
      DataTest.DATA_TIPO_ESTABLECIMIENTO,
    );
    return Promise.resolve(resultado);
  }
}
