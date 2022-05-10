import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { CadenaFarmaciaController } from '../controller/cadena-farmacia.controller';
import { CadenaFarmacia } from '../entities/cadena-farmacia.entity';
import { CadenaFarmaciaService } from '../services/cadena-farmacia.service';
import { CadenaFarmaciaServiceMock } from './mocks/cadena-farmacia-service-mock';
import { DataTest } from './mocks/data-test';

describe('CadenaFarmaciaController', () => {
  let controller: CadenaFarmaciaController;
  let service: CadenaFarmaciaService;

  beforeEach(async () => {
    const CadenaFarmaciaServiceProvider = {
      provide: CadenaFarmaciaService,
      useClass: CadenaFarmaciaServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CadenaFarmaciaController],
      providers: [CadenaFarmaciaService, CadenaFarmaciaServiceProvider],
    })
      .overrideProvider(CadenaFarmaciaService)
      .useClass(CadenaFarmaciaServiceMock)
      .compile();

    controller = module.get<CadenaFarmaciaController>(CadenaFarmaciaController);
    service = module.get<CadenaFarmaciaService>(CadenaFarmaciaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get Cadena Farmacia por id', async () => {
    const data = DataTest.DATA_CADENA_FARMACIA;
    const cadena_farmacia = plainToClass(CadenaFarmacia, data);
    const id = data.id;
    expect(await controller.getCadenaFarmaciaPorId(id)).toEqual(
      cadena_farmacia,
    );

    const getCadenaFarmaciaPorId = jest.spyOn(
      service,
      'getCadenaFarmaciaPorId',
    );
    controller.getCadenaFarmaciaPorId(id);
    expect(getCadenaFarmaciaPorId).toBeCalled();
    expect(getCadenaFarmaciaPorId).toHaveBeenCalledWith(id);
    expect(getCadenaFarmaciaPorId).toBeCalledTimes(1);
  });
});
