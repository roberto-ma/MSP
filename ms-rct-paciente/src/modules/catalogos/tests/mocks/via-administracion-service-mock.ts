import { plainToClass } from 'class-transformer';

import { ViaAdministracion } from '../../entities/via-administracion.entity';
import { DataTest } from './data-test';

export class ViaAdministracionServiceMock {
  async getViaAdministracionPorId(id: number) {
    const resultado = plainToClass(
      ViaAdministracion,
      DataTest.DATA_VIA_ADMINISTRACION,
    );
    return Promise.resolve(resultado);
  }

  async getViaAdministracionTodos() {
    const resultado = plainToClass(
      ViaAdministracion,
      DataTest.DATA_VIA_ADMINISTRACION,
    );
    return Promise.resolve([resultado]);
  }
}
