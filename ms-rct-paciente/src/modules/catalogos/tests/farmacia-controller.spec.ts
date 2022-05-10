import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { FarmaciaController } from '../controller/farmacia.controller';
import { Farmacia } from '../entities/farmacia.entity';
import { FarmaciaService } from '../services/farmacia.service';
import { DataTest } from './mocks/data-test';
import { FarmaciaServiceMock } from './mocks/farmacia-service-mock';

describe('FarmaciaController', () => {
  let controller: FarmaciaController;
  let service: FarmaciaService;

  beforeEach(async () => {
    const FarmaciaServiceProvider = {
      provide: FarmaciaService,
      useClass: FarmaciaServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmaciaController],
      providers: [FarmaciaService, FarmaciaServiceProvider],
    })
      .overrideProvider(FarmaciaService)
      .useClass(FarmaciaServiceMock)
      .compile();

    controller = module.get<FarmaciaController>(FarmaciaController);
    service = module.get<FarmaciaService>(FarmaciaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get farmacia por id', async () => {
    const data = DataTest.DATA_FARMACIA;
    const farmacia = plainToClass(Farmacia, data);
    const id = data.id;
    expect(await controller.getFarmaciaPorId(id)).toEqual(farmacia);

    const getFarmaciaPorId = jest.spyOn(service, 'getFarmaciaPorId');
    controller.getFarmaciaPorId(id);
    expect(getFarmaciaPorId).toBeCalled();
    expect(getFarmaciaPorId).toHaveBeenCalledWith(id);
    expect(getFarmaciaPorId).toBeCalledTimes(1);
  });

  it('should get farmacia por RUC', async () => {
    const data = DataTest.DATA_FARMACIA;
    const farmacia = plainToClass(Farmacia, data);
    const ruc = data.ruc;
    expect(await controller.getFarmaciaPorRuc(ruc)).toEqual(farmacia);

    const getFarmaciaPorRuc = jest.spyOn(service, 'getFarmaciaPorRuc');
    controller.getFarmaciaPorRuc(ruc);
    expect(getFarmaciaPorRuc).toBeCalled();
    expect(getFarmaciaPorRuc).toHaveBeenCalledWith(ruc);
    expect(getFarmaciaPorRuc).toBeCalledTimes(1);
  });
});
