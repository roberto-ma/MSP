import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { ConcentracionController } from '../controller/concentracion.controller';
import { Concentracion } from '../entities/concentracion.entity';
import { ConcentracionService } from '../services/concentracion.service';
import { ConcentracionServiceMock } from './mocks/concentracion-service-mock';
import { DataTest } from './mocks/data-test';

describe('ConcentracionController', () => {
  let controller: ConcentracionController;
  let service: ConcentracionService;

  beforeEach(async () => {
    const ConcentracionServiceProvider = {
      provide: ConcentracionService,
      useClass: ConcentracionServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcentracionController],
      providers: [ConcentracionService, ConcentracionServiceProvider],
    })
      .overrideProvider(ConcentracionService)
      .useClass(ConcentracionServiceMock)
      .compile();

    controller = module.get<ConcentracionController>(ConcentracionController);
    service = module.get<ConcentracionService>(ConcentracionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get concentración por id', async () => {
    const data = DataTest.DATA_CONCENTRACION;
    const concentracion = plainToClass(Concentracion, data);
    const id = data.id;
    expect(await controller.getConcentracionPorId(id)).toEqual(concentracion);

    const getConcentracionPorId = jest.spyOn(service, 'getConcentracionPorId');
    controller.getConcentracionPorId(id);
    expect(getConcentracionPorId).toBeCalled();
    expect(getConcentracionPorId).toHaveBeenCalledWith(id);
    expect(getConcentracionPorId).toBeCalledTimes(1);
  });

  it('should get Concentración todos', async () => {
    const data = DataTest.DATA_CONCENTRACION;
    const concentracion = plainToClass(Concentracion, data);
    expect(await controller.getConcentracionTodos()).toEqual([concentracion]);

    const getConcentracionTodos = jest.spyOn(service, 'getConcentracionTodos');
    controller.getConcentracionTodos();
    expect(getConcentracionTodos).toBeCalled();
    expect(getConcentracionTodos).toHaveBeenCalledWith();
    expect(getConcentracionTodos).toBeCalledTimes(1);
  });
});
