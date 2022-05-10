import { plainToClass } from 'class-transformer';

import { FuenteDatos } from '../../entities/fuente-datos.entity';
import { DataTest } from './data-test';

export class FuenteDatosServiceMock {
  async getFuenteDatosPorId(id: number) {
    const resultado = plainToClass(FuenteDatos, DataTest.DATA_FUENTE_DATOS);
    return Promise.resolve(resultado);
  }

  async getFuenteDatosTodos() {
    const resultado = plainToClass(FuenteDatos, DataTest.DATA_FUENTE_DATOS);
    return Promise.resolve([resultado]);
  }
}
