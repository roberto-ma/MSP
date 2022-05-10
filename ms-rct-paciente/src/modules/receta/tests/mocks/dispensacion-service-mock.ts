import { plainToClass } from 'class-transformer';
import { CreateDispensacionDto } from '../../dto/dispensacion.dto';
import { Dispensacion } from '../../entities/dispensacion.entity';
import { DataTest } from './data-test';

export class DispensacionServiceMock {
  async createDispensacion(
    createDispensacionDto: CreateDispensacionDto,
  ): Promise<any> {
    const data = DataTest.DATA_DISPENSACION;
    const resultado = plainToClass(Dispensacion, data);
    return Promise.resolve(resultado);
  }

  async getDispensacionPorRecetaOid(recetaOid: string): Promise<any> {
    const data = DataTest.DATA_DISPENSACION;
    const resultado = plainToClass(Dispensacion, data);
    return Promise.resolve(resultado);
  }

  async getDispensacionPorOidConReceta(recetaOid: string): Promise<any> {
    const data = DataTest.DATA_DISPENSACION;
    const resultado = plainToClass(Dispensacion, data);
    return Promise.resolve(resultado);
  }
}
