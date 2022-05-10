import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { TipoIdentificacionController } from '../controller/tipo-identificacion.controller';
import { RiesgoMedicamento } from '../entities/riesgomedicamento.entity';
import { TipoAtencion } from '../entities/tipo-atencion.entity';
import { TipoIdentificacion } from '../entities/tipo-identificacion.entity';
import { TipoIdentificacionService } from '../services/tipo-identificacion.service';
import { DataTest } from './mocks/data-test';
import { TipoIdentificacionServiceMock } from './mocks/tipo-identificacion-service-mock';

describe('TipoIdentificacionController', () => {
  let controller: TipoIdentificacionController;
  let service: TipoIdentificacionService;

  beforeEach(async () => {
    const TipoIdentificacionServiceProvider = {
      provide: TipoIdentificacionService,
      useClass: TipoIdentificacionServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoIdentificacionController],
      providers: [TipoIdentificacionService, TipoIdentificacionServiceProvider],
    })
      .overrideProvider(TipoIdentificacionService)
      .useClass(TipoIdentificacionServiceMock)
      .compile();

    controller = module.get<TipoIdentificacionController>(
      TipoIdentificacionController,
    );
    service = module.get<TipoIdentificacionService>(TipoIdentificacionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get tipo identificación por id', async () => {
    const data = DataTest.DATA_TIPO_IDENTIFICACION;
    const tipo_identificacion = plainToClass(TipoIdentificacion, data);
    const id = data.id;
    expect(await controller.getTipoIdentificacionPorId(id)).toEqual(
      tipo_identificacion,
    );

    const getTipoIdentificacionPorId = jest.spyOn(
      service,
      'getTipoIdentificacionPorId',
    );
    controller.getTipoIdentificacionPorId(id);
    expect(getTipoIdentificacionPorId).toBeCalled();
    expect(getTipoIdentificacionPorId).toHaveBeenCalledWith(id);
    expect(getTipoIdentificacionPorId).toBeCalledTimes(1);
  });

  it('should get tipo identificacion todos', async () => {
    const data = DataTest.DATA_TIPO_IDENTIFICACION;
    const tipo_identificacion = plainToClass(TipoIdentificacion, data);
    expect(await controller.getTipoIdentificacionTodos()).toEqual([
      tipo_identificacion,
    ]);

    const getTipoIdentificacionTodos = jest.spyOn(
      service,
      'getTipoIdentificacionTodos',
    );
    controller.getTipoIdentificacionTodos();
    expect(getTipoIdentificacionTodos).toBeCalled();
    expect(getTipoIdentificacionTodos).toHaveBeenCalledWith();
    expect(getTipoIdentificacionTodos).toBeCalledTimes(1);
  });
});
