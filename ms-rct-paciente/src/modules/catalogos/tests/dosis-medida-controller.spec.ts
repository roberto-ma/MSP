import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { DosisMedidaController } from '../controller/dosis-medida.controller';
import { DosisMedida } from '../entities/dosis-medida.entity';
import { DosisMedidaService } from '../services/dosis-medida.service';
import { DataTest } from './mocks/data-test';
import { DosisMedidaServiceMock } from './mocks/dosis-medida-service-mock';

describe('DosisMedidaController', () => {
  let controller: DosisMedidaController;
  let service: DosisMedidaService;

  beforeEach(async () => {
    const DosisMedidaServiceProvider = {
      provide: DosisMedidaService,
      useClass: DosisMedidaServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DosisMedidaController],
      providers: [DosisMedidaService, DosisMedidaServiceProvider],
    })
      .overrideProvider(DosisMedidaService)
      .useClass(DosisMedidaServiceMock)
      .compile();

    controller = module.get<DosisMedidaController>(DosisMedidaController);
    service = module.get<DosisMedidaService>(DosisMedidaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get dosis medida por id', async () => {
    const data = DataTest.DATA_DOSIS_MEDIDA;
    const dosismedida = plainToClass(DosisMedida, data);
    const id = data.id;
    expect(await controller.getDosisMedidaPorId(id)).toEqual(dosismedida);

    const getDosisMedidaPorId = jest.spyOn(service, 'getDosisMedidaPorId');
    controller.getDosisMedidaPorId(id);
    expect(getDosisMedidaPorId).toBeCalled();
    expect(getDosisMedidaPorId).toHaveBeenCalledWith(id);
    expect(getDosisMedidaPorId).toBeCalledTimes(1);
  });

  it('should get Dosis Medida todos', async () => {
    const data = DataTest.DATA_DOSIS_MEDIDA;
    const dosismedida = plainToClass(DosisMedida, data);
    expect(await controller.getDosisMedidaTodos()).toEqual([dosismedida]);

    const getDosisMedidaTodos = jest.spyOn(service, 'getDosisMedidaTodos');
    controller.getDosisMedidaTodos();
    expect(getDosisMedidaTodos).toBeCalled();
    expect(getDosisMedidaTodos).toHaveBeenCalledWith();
    expect(getDosisMedidaTodos).toBeCalledTimes(1);
  });
});
