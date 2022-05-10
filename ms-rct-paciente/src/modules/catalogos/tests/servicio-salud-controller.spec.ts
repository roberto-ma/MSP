import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { ServicioSaludController } from '../controller/servicio-salud.controller';
import { ServicioSalud } from '../entities/servicio-salud.entity';
import { ServicioSaludService } from '../services/servicio-salud.service';
import { DataTest } from './mocks/data-test';
import { ServicioSaludServiceMock } from './mocks/servicio-salud-service-mock';

describe('ServicioSaludController', () => {
  let controller: ServicioSaludController;
  let service: ServicioSaludService;

  beforeEach(async () => {
    const ServicioSaludServiceProvider = {
      provide: ServicioSaludService,
      useClass: ServicioSaludServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicioSaludController],
      providers: [ServicioSaludService, ServicioSaludServiceProvider],
    })
      .overrideProvider(ServicioSaludService)
      .useClass(ServicioSaludServiceMock)
      .compile();

    controller = module.get<ServicioSaludController>(ServicioSaludController);
    service = module.get<ServicioSaludService>(ServicioSaludService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get servicio salud por id', async () => {
    const data = DataTest.DATA_SERVICIO_SALUD;
    const servici_salud = plainToClass(ServicioSalud, data);
    const id = data.id;
    expect(await controller.getServicioSaludPorId(id)).toEqual(servici_salud);

    const getServicioSaludPorId = jest.spyOn(service, 'getServicioSaludPorId');
    controller.getServicioSaludPorId(id);
    expect(getServicioSaludPorId).toBeCalled();
    expect(getServicioSaludPorId).toHaveBeenCalledWith(id);
    expect(getServicioSaludPorId).toBeCalledTimes(1);
  });
});
