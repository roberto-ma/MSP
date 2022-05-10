import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { EspecialidadController } from '../controller/especialidad.controller';
import { Especialidad } from '../entities/especialidad.entity';
import { EspecialidadService } from '../services/especialidad.service';
import { DataTest } from './mocks/data-test';
import { EspecialidadServiceMock } from './mocks/especialidad-service-mock';

describe('EspecialidadController', () => {
  let controller: EspecialidadController;
  let service: EspecialidadService;

  beforeEach(async () => {
    const EspecialidadServiceProvider = {
      provide: EspecialidadService,
      useClass: EspecialidadServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EspecialidadController],
      providers: [EspecialidadService, EspecialidadServiceProvider],
    })
      .overrideProvider(EspecialidadService)
      .useClass(EspecialidadServiceMock)
      .compile();

    controller = module.get<EspecialidadController>(EspecialidadController);
    service = module.get<EspecialidadService>(EspecialidadService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get especialidad por id', async () => {
    const data = DataTest.DATA_ESPECIALIDAD;
    const especialidad = plainToClass(Especialidad, data);
    const id = data.id;
    expect(await controller.getEspecialidadPorId(id)).toEqual(especialidad);

    const getEspecialidadPorId = jest.spyOn(service, 'getEspecialidadPorId');
    controller.getEspecialidadPorId(id);
    expect(getEspecialidadPorId).toBeCalled();
    expect(getEspecialidadPorId).toHaveBeenCalledWith(id);
    expect(getEspecialidadPorId).toBeCalledTimes(1);
  });
});
