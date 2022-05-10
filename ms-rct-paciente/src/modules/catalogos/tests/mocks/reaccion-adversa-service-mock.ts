import { plainToClass } from 'class-transformer';

import { ReaccionAdversa } from '../../entities/reaccion-adversa.entity';
import { DataTest } from './data-test';

export class ReaccionAdversaServiceMock {
  async getReaccionAdversaPorId(id: number) {
    const resultado = plainToClass(
      ReaccionAdversa,
      DataTest.DATA_REACCION_ADVERSA,
    );
    return Promise.resolve(resultado);
  }
}
