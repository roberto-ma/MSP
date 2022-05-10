import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { TarifarioController } from '../controller/tarifario.controller';
import { Tarifario } from '../entities/tarifario.entity';
import { TarifarioService } from '../services/tarifario.service';
import { DataTest } from './mocks/data-test';
import { TarifarioServiceMock } from './mocks/tarifario-service-mock';

describe('TarifarioController', () => {
  let controller: TarifarioController;
  let service: TarifarioService;

  beforeEach(async () => {
    const TarifarioServiceProvider = {
      provide: TarifarioService,
      useClass: TarifarioServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TarifarioController],
      providers: [TarifarioService, TarifarioServiceProvider],
    })
      .overrideProvider(TarifarioService)
      .useClass(TarifarioServiceMock)
      .compile();

    controller = module.get<TarifarioController>(TarifarioController);
    service = module.get<TarifarioService>(TarifarioService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get tarifario por producto id', async () => {
    const data = DataTest.DATA_TARIFARIO;
    const tarifario = plainToClass(Tarifario, data);
    const producto_id = data.productoId;
    expect(await controller.getTarifarioPorProductId(producto_id)).toEqual(
      tarifario,
    );

    const getTarifarioPorProductId = jest.spyOn(
      service,
      'getTarifarioPorProductId',
    );
    controller.getTarifarioPorProductId(producto_id);
    expect(getTarifarioPorProductId).toBeCalled();
    expect(getTarifarioPorProductId).toHaveBeenCalledWith(producto_id);
    expect(getTarifarioPorProductId).toBeCalledTimes(1);
  });
});
