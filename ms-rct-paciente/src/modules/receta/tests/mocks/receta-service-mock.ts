import { plainToClass } from 'class-transformer';
import { ValidateRecetaDto } from '../../dto/receta-validacion.dto';
import { Receta } from '../../entities/receta.entity';

import { DataTest } from './data-test';

export class RecetaServiceMock {
  async createReceta(createRecetaDto) {
    const resultado = plainToClass(Receta, DataTest.DATA_RECETA_PRESCRITA);
    return Promise.resolve(resultado);
  }

  async getRecetaPorOidConVerificacionEstado(oid): Promise<any> {
    const data = DataTest.DATA_RECETA;
    const resultado = plainToClass(Receta, data);
    return Promise.resolve(resultado);
  }

  async getRecetaPorId(id): Promise<any> {
    const data = DataTest.DATA_RECETA;
    const resultado = plainToClass(Receta, data);
    return Promise.resolve(resultado);
  }

  async getRecetaPorOid(oid): Promise<any> {
    const data = DataTest.DATA_RECETA;
    const resultado = plainToClass(Receta, data);
    return Promise.resolve(resultado);
  }

  async validatePreciosReceta(validateRecetaDto: ValidateRecetaDto) {
    const resultado = plainToClass(Receta, DataTest.DATA_RECETA);
    return Promise.resolve(resultado);
  }

  async updateAnulacionReceta(validateRecetaDto: ValidateRecetaDto) {
    const resultado = plainToClass(Receta, DataTest.DATA_RECETA);
    return Promise.resolve(resultado);
  }
}
