import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { TipoAtencionController } from '../controller/tipo-atencion.controller';
import { RiesgoMedicamento } from '../entities/riesgomedicamento.entity';
import { TipoAtencion } from '../entities/tipo-atencion.entity';
import { TipoAtencionService } from '../services/tipo-atencion.service';
import { DataTest } from './mocks/data-test';
import { TipoAtencionServiceMock } from './mocks/tipo-atencion-service-mock';

describe('TipoAtencionController', () => {
  let controller: TipoAtencionController;
  let service: TipoAtencionService;

  beforeEach(async () => {
    const TipoAtencionServiceProvider = {
      provide: TipoAtencionService,
      useClass: TipoAtencionServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoAtencionController],
      providers: [TipoAtencionService, TipoAtencionServiceProvider],
    })
      .overrideProvider(TipoAtencionService)
      .useClass(TipoAtencionServiceMock)
      .compile();

    controller = module.get<TipoAtencionController>(TipoAtencionController);
    service = module.get<TipoAtencionService>(TipoAtencionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get tipo atencion por id', async () => {
    const data = DataTest.DATA_TIPO_ATENCION;
    const tipo_atencion = plainToClass(TipoAtencion, data);
    const id = data.id;
    expect(await controller.getTipoAtencionPorId(id)).toEqual(tipo_atencion);

    const getTipoAtencionPorId = jest.spyOn(service, 'getTipoAtencionPorId');
    controller.getTipoAtencionPorId(id);
    expect(getTipoAtencionPorId).toBeCalled();
    expect(getTipoAtencionPorId).toHaveBeenCalledWith(id);
    expect(getTipoAtencionPorId).toBeCalledTimes(1);
  });

  it('should get tipo atencion todos', async () => {
    const data = DataTest.DATA_TIPO_ATENCION;
    const tipo_atencion = plainToClass(TipoAtencion, data);
    expect(await controller.getTipoAtencionTodos()).toEqual([tipo_atencion]);

    const getTipoAtencionTodos = jest.spyOn(service, 'getTipoAtencionTodos');
    controller.getTipoAtencionTodos();
    expect(getTipoAtencionTodos).toBeCalled();
    expect(getTipoAtencionTodos).toHaveBeenCalledWith();
    expect(getTipoAtencionTodos).toBeCalledTimes(1);
  });
});
