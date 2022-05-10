import { plainToClass } from 'class-transformer';

import { TipoAtencion } from '../../entities/tipo-atencion.entity';
import { DataTest } from './data-test';

export class TipoAtencionServiceMock {
  async getTipoAtencionPorId(id: number) {
    const resultado = plainToClass(TipoAtencion, DataTest.DATA_TIPO_ATENCION);
    return Promise.resolve(resultado);
  }

  async getTipoAtencionTodos() {
    const resultado = plainToClass(TipoAtencion, DataTest.DATA_TIPO_ATENCION);
    return Promise.resolve([resultado]);
  }
}
