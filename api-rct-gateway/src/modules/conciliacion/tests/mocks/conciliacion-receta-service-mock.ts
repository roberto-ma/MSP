import { CreateConciliacionRecetaDto } from '../../dto/conciliacion-receta.dto';

export class ConciliacionRecetaServiceMock {
  async validarConciliacionDetalle(
    createConciliacionRecetaDto: CreateConciliacionRecetaDto,
  ): Promise<any> {
    return Promise.resolve({
      id: Math.random() * (1000 - 1) + 1,
      ...createConciliacionRecetaDto,
    });
  }
}
