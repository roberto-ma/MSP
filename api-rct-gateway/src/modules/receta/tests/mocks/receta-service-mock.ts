import { plainToClass } from 'class-transformer';

import { ReadRecetaDetalleDto } from '../../dto/receta-detalle.dto';
import {
  ReadRecetaAutorizadaDto,
  ValidateRecetaDto,
} from '../../dto/receta-validacion.dto';
import { ReadRecetaSimpleDto } from '../../dto/receta.dto';
import { DataTest } from './data-test';

export class RecetaServiceMock {
  async getRecetaPorOid(oid): Promise<any> {
    const data = DataTest.DATA_RECETA;
    const resultado = plainToClass(ReadRecetaDetalleDto, data);
    return Promise.resolve(resultado);
  }

  async createReceta(createRecetaDto) {
    const resultado = plainToClass(
      ReadRecetaSimpleDto,
      DataTest.DATA_RECETA_PRESCRITA,
    );
    return Promise.resolve(resultado);
  }

  async validatePreciosReceta(validateRecetaDto: ValidateRecetaDto) {
    const resultado = plainToClass(
      ReadRecetaAutorizadaDto,
      DataTest.DATA_RECETA,
    );
    return Promise.resolve(resultado);
  }

  async updateAnulacionReceta(validateRecetaDto: ValidateRecetaDto) {
    const resultado = plainToClass(ReadRecetaSimpleDto, DataTest.DATA_RECETA);
    return Promise.resolve(resultado);
  }
}
