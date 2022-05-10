import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { DosificacionController } from '../controller/dosificacion.controller';
import { Dosificacion } from '../entities/dosificacion.entity';
import { DosificacionService } from '../services/dosificacion.service';
import { DataTest } from './mocks/data-test';
import { DosificacionServiceMock } from './mocks/dosificacion-service-mock';

describe('DosificacionController', () => {
  let controller: DosificacionController;
  let service: DosificacionService;

  beforeEach(async () => {
    const DosificacionServiceProvider = {
      provide: DosificacionService,
      useClass: DosificacionServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DosificacionController],
      providers: [DosificacionService, DosificacionServiceProvider],
    })
      .overrideProvider(DosificacionService)
      .useClass(DosificacionServiceMock)
      .compile();

    controller = module.get<DosificacionController>(DosificacionController);
    service = module.get<DosificacionService>(DosificacionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get concentración por id', async () => {
    const data = DataTest.DATA_DOSIFICACION;
    const dosificacion = plainToClass(Dosificacion, data);
    const id = data.id;
    expect(await controller.getDosificacionPorId(id)).toEqual(dosificacion);

    const getDosificacionPorId = jest.spyOn(service, 'getDosificacionPorId');
    controller.getDosificacionPorId(id);
    expect(getDosificacionPorId).toBeCalled();
    expect(getDosificacionPorId).toHaveBeenCalledWith(id);
    expect(getDosificacionPorId).toBeCalledTimes(1);
  });
});
