import { CreateConciliacionMspDto } from '../../dto/conciliacion-msp.dto';

export class ConciliacionMspServiceMock {
  async createConciliacion(
    createConciliacionMspDto: CreateConciliacionMspDto,
  ): Promise<any> {
    return Promise.resolve({
      id: Math.random() * (1000 - 1) + 1,
      ...createConciliacionMspDto,
    });
  }
}
