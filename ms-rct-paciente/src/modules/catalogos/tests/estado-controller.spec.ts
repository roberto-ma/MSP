import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { EstadoController } from '../controller/estado.controller';
import { Estado } from '../entities/estadoreceta.entity';
import { EstadoService } from '../services/estado.service';
import { DataTest } from './mocks/data-test';
import { EstadoServiceMock } from './mocks/estado-service-mock';

describe('EstadoController', () => {
  let controller: EstadoController;
  let service: EstadoService;

  beforeEach(async () => {
    const EstadoServiceProvider = {
      provide: EstadoService,
      useClass: EstadoServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoController],
      providers: [EstadoService, EstadoServiceProvider],
    })
      .overrideProvider(EstadoService)
      .useClass(EstadoServiceMock)
      .compile();

    controller = module.get<EstadoController>(EstadoController);
    service = module.get<EstadoService>(EstadoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get estado por id', async () => {
    const data = DataTest.DATA_ESTADO_RECETA;
    const estado = plainToClass(Estado, data);
    const id = data.id;
    expect(await controller.getEstadoPorId(id)).toEqual(estado);

    const getEstadoPorId = jest.spyOn(service, 'getEstadoPorId');
    controller.getEstadoPorId(id);
    expect(getEstadoPorId).toBeCalled();
    expect(getEstadoPorId).toHaveBeenCalledWith(id);
    expect(getEstadoPorId).toBeCalledTimes(1);
  });

  it('should get estado todos', async () => {
    const data = DataTest.DATA_ESTADO_RECETA;
    const estado = plainToClass(Estado, data);
    expect(await controller.getEstadoTodos()).toEqual([estado]);

    const getEstadoTodos = jest.spyOn(service, 'getEstadoTodos');
    controller.getEstadoTodos();
    expect(getEstadoTodos).toBeCalled();
    expect(getEstadoTodos).toHaveBeenCalledWith();
    expect(getEstadoTodos).toBeCalledTimes(1);
  });
});
