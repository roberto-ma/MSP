import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { EtniaController } from '../controller/etnia.controller';
import { Etnia } from '../entities/etnia.entity';
import { EtniaService } from '../services/etnia.service';
import { DataTest } from './mocks/data-test';
import { EtniaServiceMock } from './mocks/etnia-service-mock';

describe('EtniaController', () => {
  let controller: EtniaController;
  let service: EtniaService;

  beforeEach(async () => {
    const EtniaServiceProvider = {
      provide: EtniaService,
      useClass: EtniaServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EtniaController],
      providers: [EtniaService, EtniaServiceProvider],
    })
      .overrideProvider(EtniaService)
      .useClass(EtniaServiceMock)
      .compile();

    controller = module.get<EtniaController>(EtniaController);
    service = module.get<EtniaService>(EtniaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get etnia por id', async () => {
    const data = DataTest.DATA_ETNIA;
    const etnia = plainToClass(Etnia, data);
    const id = data.id;
    expect(await controller.getEtniaPorId(id)).toEqual(etnia);

    const getEtniaPorId = jest.spyOn(service, 'getEtniaPorId');
    controller.getEtniaPorId(id);
    expect(getEtniaPorId).toBeCalled();
    expect(getEtniaPorId).toHaveBeenCalledWith(id);
    expect(getEtniaPorId).toBeCalledTimes(1);
  });

  it('should get etnia por código PRAS', async () => {
    const data = DataTest.DATA_ETNIA;
    const etnia = plainToClass(Etnia, data);
    const codigoPras = data.codigoPras;
    expect(await controller.getEtniaPorCodigoPras(codigoPras)).toEqual(etnia);

    const getEtniaPorCodigoPras = jest.spyOn(service, 'getEtniaPorCodigoPras');
    controller.getEtniaPorCodigoPras(codigoPras);
    expect(getEtniaPorCodigoPras).toBeCalled();
    expect(getEtniaPorCodigoPras).toHaveBeenCalledWith(codigoPras);
    expect(getEtniaPorCodigoPras).toBeCalledTimes(1);
  });

  it('should get etnia todos', async () => {
    const data = DataTest.DATA_ETNIA;
    const etnia = plainToClass(Etnia, data);
    expect(await controller.getEtniaTodos()).toEqual([etnia]);

    const getEtniaTodos = jest.spyOn(service, 'getEtniaTodos');
    controller.getEtniaTodos();
    expect(getEtniaTodos).toBeCalled();
    expect(getEtniaTodos).toHaveBeenCalledWith();
    expect(getEtniaTodos).toBeCalledTimes(1);
  });
});
