import { plainToClass } from 'class-transformer';

import { TipoIdentificacion } from '../../entities/tipo-identificacion.entity';
import { DataTest } from './data-test';

export class TipoIdentificacionServiceMock {
  async getTipoIdentificacionPorId(id: number) {
    const resultado = plainToClass(
      TipoIdentificacion,
      DataTest.DATA_TIPO_IDENTIFICACION,
    );
    return Promise.resolve(resultado);
  }

  async getTipoIdentificacionTodos() {
    const resultado = plainToClass(
      TipoIdentificacion,
      DataTest.DATA_TIPO_IDENTIFICACION,
    );
    return Promise.resolve([resultado]);
  }
}
