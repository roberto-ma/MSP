import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { InteraccionesController } from '../controller/interacciones.controller';
import { Interacciones } from '../entities/interacciones.entity';
import { InteraccionesService } from '../services/interacciones.service';
import { DataTest } from './mocks/data-test';
import { InteraccionesServiceMock } from './mocks/interacciones-service-mock';

describe('InteraccionesController', () => {
  let controller: InteraccionesController;
  let service: InteraccionesService;

  beforeEach(async () => {
    const InteraccionesServiceProvider = {
      provide: InteraccionesService,
      useClass: InteraccionesServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [InteraccionesController],
      providers: [InteraccionesService, InteraccionesServiceProvider],
    })
      .overrideProvider(InteraccionesService)
      .useClass(InteraccionesServiceMock)
      .compile();

    controller = module.get<InteraccionesController>(InteraccionesController);
    service = module.get<InteraccionesService>(InteraccionesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get interacciones por id', async () => {
    const data = DataTest.DATA_INTERACCION;
    const interaccion = plainToClass(Interacciones, data);
    const id = data.id;
    expect(await controller.getInteraccionesPorId(id)).toEqual(interaccion);

    const getInteraccionesPorId = jest.spyOn(service, 'getInteraccionesPorId');
    controller.getInteraccionesPorId(id);
    expect(getInteraccionesPorId).toBeCalled();
    expect(getInteraccionesPorId).toHaveBeenCalledWith(id);
    expect(getInteraccionesPorId).toBeCalledTimes(1);
  });
});
