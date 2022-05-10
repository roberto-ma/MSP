import { plainToClass } from 'class-transformer';

import { ServicioSalud } from '../../entities/servicio-salud.entity';
import { DataTest } from './data-test';

export class ServicioSaludServiceMock {
  async getServicioSaludPorId(id: number) {
    const resultado = plainToClass(ServicioSalud, DataTest.DATA_SERVICIO_SALUD);
    return Promise.resolve(resultado);
  }
}
