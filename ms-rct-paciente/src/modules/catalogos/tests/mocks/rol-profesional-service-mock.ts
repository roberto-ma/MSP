import { plainToClass } from 'class-transformer';

import { RolProfesional } from '../../entities/rol-profesional.entity';
import { DataTest } from './data-test';

export class RolProfesionalServiceMock {
  async getRolProfesionalPorId(id: number) {
    const resultado = plainToClass(
      RolProfesional,
      DataTest.DATA_ROL_PROFESIONAL,
    );
    return Promise.resolve(resultado);
  }

  async getRolProfesionalTodos() {
    const resultado = plainToClass(
      RolProfesional,
      DataTest.DATA_ROL_PROFESIONAL,
    );
    return Promise.resolve([resultado]);
  }
}
