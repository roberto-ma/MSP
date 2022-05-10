import { plainToClass } from 'class-transformer';

import { Religion } from '../../entities/religion.entity';
import { DataTest } from './data-test';

export class ReligionServiceMock {
  async getReligionPorId(id: number) {
    const resultado = plainToClass(Religion, DataTest.DATA_RELIGION);
    return Promise.resolve(resultado);
  }

  async getReligionPorCodigoPras(codigoPras: string) {
    const resultado = plainToClass(Religion, DataTest.DATA_RELIGION);
    return Promise.resolve(resultado);
  }

  async getReligionTodos() {
    const resultado = plainToClass(Religion, DataTest.DATA_RELIGION);
    return Promise.resolve([resultado]);
  }
}
