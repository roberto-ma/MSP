import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { IndicacionesCnmbController } from '../controller/indicaciones-cnmb.controller';
import { IndicacionesCnmb } from '../entities/indicaciones-cnmb.entity';
import { IndicacionesCnmbService } from '../services/indicaciones-cnmb.service';
import { DataTest } from './mocks/data-test';
import { IndicacionesCnmbServiceMock } from './mocks/indicaciones-cnmb-service-mock';

describe('IndicacionesCnmbController', () => {
  let controller: IndicacionesCnmbController;
  let service: IndicacionesCnmbService;

  beforeEach(async () => {
    const IndicacionesCnmbServiceProvider = {
      provide: IndicacionesCnmbService,
      useClass: IndicacionesCnmbServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndicacionesCnmbController],
      providers: [IndicacionesCnmbService, IndicacionesCnmbServiceProvider],
    })
      .overrideProvider(IndicacionesCnmbService)
      .useClass(IndicacionesCnmbServiceMock)
      .compile();

    controller = module.get<IndicacionesCnmbController>(
      IndicacionesCnmbController,
    );
    service = module.get<IndicacionesCnmbService>(IndicacionesCnmbService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get indicaciones cnmb por id', async () => {
    const data = DataTest.DATA_INDICACIONES_CNMB;
    const indicaciones = plainToClass(IndicacionesCnmb, data);
    const id = data.id;
    expect(await controller.getIndicacionesCnmbPorId(id)).toEqual(indicaciones);

    const getIndicacionesCnmbPorId = jest.spyOn(
      service,
      'getIndicacionesCnmbPorId',
    );
    controller.getIndicacionesCnmbPorId(id);
    expect(getIndicacionesCnmbPorId).toBeCalled();
    expect(getIndicacionesCnmbPorId).toHaveBeenCalledWith(id);
    expect(getIndicacionesCnmbPorId).toBeCalledTimes(1);
  });
});
