import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { ViaAdministracionController } from '../controller/viaAdministracion.controller';

import { ViaAdministracion } from '../entities/via-administracion.entity';
import { ViaAdministracionService } from '../services/via-administracion.service';
import { DataTest } from './mocks/data-test';
import { ViaAdministracionServiceMock } from './mocks/via-administracion-service-mock';

describe('ViaAdministracionController', () => {
  let controller: ViaAdministracionController;
  let service: ViaAdministracionService;

  beforeEach(async () => {
    const ViaAdministracionServiceProvider = {
      provide: ViaAdministracionService,
      useClass: ViaAdministracionServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViaAdministracionController],
      providers: [ViaAdministracionService, ViaAdministracionServiceProvider],
    })
      .overrideProvider(ViaAdministracionService)
      .useClass(ViaAdministracionServiceMock)
      .compile();

    controller = module.get<ViaAdministracionController>(
      ViaAdministracionController,
    );
    service = module.get<ViaAdministracionService>(ViaAdministracionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get via administración por id', async () => {
    const data = DataTest.DATA_VIA_ADMINISTRACION;
    const via_administracion = plainToClass(ViaAdministracion, data);
    const id = data.id;
    expect(await controller.getViaAdministracionPorId(id)).toEqual(
      via_administracion,
    );

    const getViaAdministracionPorId = jest.spyOn(
      service,
      'getViaAdministracionPorId',
    );
    controller.getViaAdministracionPorId(id);
    expect(getViaAdministracionPorId).toBeCalled();
    expect(getViaAdministracionPorId).toHaveBeenCalledWith(id);
    expect(getViaAdministracionPorId).toBeCalledTimes(1);
  });

  it('should get via administración todos', async () => {
    const data = DataTest.DATA_VIA_ADMINISTRACION;
    const via_administracion = plainToClass(ViaAdministracion, data);
    expect(await controller.getViaAdministracionTodos()).toEqual([
      via_administracion,
    ]);

    const getViaAdministracionTodos = jest.spyOn(
      service,
      'getViaAdministracionTodos',
    );
    controller.getViaAdministracionTodos();
    expect(getViaAdministracionTodos).toBeCalled();
    expect(getViaAdministracionTodos).toHaveBeenCalledWith();
    expect(getViaAdministracionTodos).toBeCalledTimes(1);
  });
});
