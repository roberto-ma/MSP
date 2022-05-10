import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { ObservacionController } from '../controller/observacion.controller';
import { Observacion } from '../entities/observacion.entity';
import { ObservacionService } from '../services/observacion.service';
import { DataTest } from './mocks/data-test';
import { ObservacionServiceMock } from './mocks/observacion-service-mock';

describe('ObservacionController', () => {
  let controller: ObservacionController;
  let service: ObservacionService;

  beforeEach(async () => {
    const ObservacionServiceProvider = {
      provide: ObservacionService,
      useClass: ObservacionServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObservacionController],
      providers: [ObservacionService, ObservacionServiceProvider],
    })
      .overrideProvider(ObservacionService)
      .useClass(ObservacionServiceMock)
      .compile();

    controller = module.get<ObservacionController>(ObservacionController);
    service = module.get<ObservacionService>(ObservacionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get observacion por id', async () => {
    const data = DataTest.DATA_OBSERVACION;
    const observacion = plainToClass(Observacion, data);
    const id = data.id;
    expect(await controller.getObservacionPorId(id)).toEqual(observacion);

    const getObservacionPorId = jest.spyOn(service, 'getObservacionPorId');
    controller.getObservacionPorId(id);
    expect(getObservacionPorId).toBeCalled();
    expect(getObservacionPorId).toHaveBeenCalledWith(id);
    expect(getObservacionPorId).toBeCalledTimes(1);
  });
});
