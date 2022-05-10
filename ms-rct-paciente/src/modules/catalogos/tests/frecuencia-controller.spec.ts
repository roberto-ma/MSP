import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { FrecuenciaController } from '../controller/frecuencia.controller';
import { Frecuencia } from '../entities/frecuencia.entity';
import { FrecuenciaService } from '../services/frecuencia.service';
import { DataTest } from './mocks/data-test';
import { FrecuenciaServiceMock } from './mocks/frecuencia-service-mock';

describe('FrecuenciaController', () => {
  let controller: FrecuenciaController;
  let service: FrecuenciaService;

  beforeEach(async () => {
    const FrecuenciaServiceProvider = {
      provide: FrecuenciaService,
      useClass: FrecuenciaServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FrecuenciaController],
      providers: [FrecuenciaService, FrecuenciaServiceProvider],
    })
      .overrideProvider(FrecuenciaService)
      .useClass(FrecuenciaServiceMock)
      .compile();

    controller = module.get<FrecuenciaController>(FrecuenciaController);
    service = module.get<FrecuenciaService>(FrecuenciaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get frecuencia por id', async () => {
    const data = DataTest.DATA_FRECUENCIA;
    const frecuencia = plainToClass(Frecuencia, data);
    const id = data.id;
    expect(await controller.getFrecuenciaPorId(id)).toEqual(frecuencia);

    const getFrecuenciaPorId = jest.spyOn(service, 'getFrecuenciaPorId');
    controller.getFrecuenciaPorId(id);
    expect(getFrecuenciaPorId).toBeCalled();
    expect(getFrecuenciaPorId).toHaveBeenCalledWith(id);
    expect(getFrecuenciaPorId).toBeCalledTimes(1);
  });

  it('should get frecuencia todos', async () => {
    const data = DataTest.DATA_FRECUENCIA;
    const frecuencia = plainToClass(Frecuencia, data);
    expect(await controller.getFrecuenciaTodos()).toEqual([frecuencia]);

    const getFrecuenciaTodos = jest.spyOn(service, 'getFrecuenciaTodos');
    controller.getFrecuenciaTodos();
    expect(getFrecuenciaTodos).toBeCalled();
    expect(getFrecuenciaTodos).toHaveBeenCalledWith();
    expect(getFrecuenciaTodos).toBeCalledTimes(1);
  });
});
