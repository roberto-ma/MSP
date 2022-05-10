import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { PresentacionController } from '../controller/presentacion.controller';
import { Presentacion } from '../entities/presentacion.entity';
import { PresentacionService } from '../services/presentacion.service';
import { DataTest } from './mocks/data-test';
import { PresentacionServiceMock } from './mocks/presentacion-service-mock';

describe('PresentacionController', () => {
  let controller: PresentacionController;
  let service: PresentacionService;

  beforeEach(async () => {
    const PresentacionServiceProvider = {
      provide: PresentacionService,
      useClass: PresentacionServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PresentacionController],
      providers: [PresentacionService, PresentacionServiceProvider],
    })
      .overrideProvider(PresentacionService)
      .useClass(PresentacionServiceMock)
      .compile();

    controller = module.get<PresentacionController>(PresentacionController);
    service = module.get<PresentacionService>(PresentacionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get presentacion por id', async () => {
    const data = DataTest.DATA_PRESENTACION;
    const presentacion = plainToClass(Presentacion, data);
    const id = data.id;
    expect(await controller.getPresentacionPorId(id)).toEqual(presentacion);

    const getPresentacionPorId = jest.spyOn(service, 'getPresentacionPorId');
    controller.getPresentacionPorId(id);
    expect(getPresentacionPorId).toBeCalled();
    expect(getPresentacionPorId).toHaveBeenCalledWith(id);
    expect(getPresentacionPorId).toBeCalledTimes(1);
  });
});
