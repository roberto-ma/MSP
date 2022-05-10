import { plainToClass } from 'class-transformer';

import {
  CreateProfesionalSaludDto,
  ReadProfesionalSaludDto,
} from '../../dto/profesional-salud.dto';
import { DataTest } from './data-test';

export class ProfesionalSaludServiceMock {
  async createProfesionalSalud(
    createProfesionalSaludDto: CreateProfesionalSaludDto,
  ) {
    return Promise.resolve({
      id: Math.random() * (1000 - 1) + 1,
      ...createProfesionalSaludDto,
    });
  }

  async getProfesionalSaludPorIdentificacion(identificacion: string) {
    const data = DataTest.DATA_PROFESIONAL_SALUD;
    const data_profesional_salud = plainToClass(ReadProfesionalSaludDto, data);
    return Promise.resolve({
      id: Math.random() * (1000 - 1) + 1,
      ...data_profesional_salud,
    });
  }
}
