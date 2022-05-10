import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { FuenteDatosController } from '../controller/fuente-datos.controller';
import { FuenteDatos } from '../entities/fuente-datos.entity';
import { FuenteDatosService } from '../services/fuente-datos.service';
import { DataTest } from './mocks/data-test';
import { FuenteDatosServiceMock } from './mocks/fuente-datos-service-mock';

describe('FuenteDatosController', () => {
  let controller: FuenteDatosController;
  let service: FuenteDatosService;

  beforeEach(async () => {
    const FuenteDatosServiceProvider = {
      provide: FuenteDatosService,
      useClass: FuenteDatosServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuenteDatosController],
      providers: [FuenteDatosService, FuenteDatosServiceProvider],
    })
      .overrideProvider(FuenteDatosService)
      .useClass(FuenteDatosServiceMock)
      .compile();

    controller = module.get<FuenteDatosController>(FuenteDatosController);
    service = module.get<FuenteDatosService>(FuenteDatosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get fuente de datos por id', async () => {
    const data = DataTest.DATA_FUENTE_DATOS;
    const fuentedatos = plainToClass(FuenteDatos, data);
    const id = data.id;
    expect(await controller.getFuenteDatosPorId(id)).toEqual(fuentedatos);

    const getFuenteDatosPorId = jest.spyOn(service, 'getFuenteDatosPorId');
    controller.getFuenteDatosPorId(id);
    expect(getFuenteDatosPorId).toBeCalled();
    expect(getFuenteDatosPorId).toHaveBeenCalledWith(id);
    expect(getFuenteDatosPorId).toBeCalledTimes(1);
  });

  it('should get frecuencia todos', async () => {
    const data = DataTest.DATA_FUENTE_DATOS;
    const fuentedatos = plainToClass(FuenteDatos, data);
    expect(await controller.getFuenteDatosTodos()).toEqual([fuentedatos]);

    const getFuenteDatosTodos = jest.spyOn(service, 'getFuenteDatosTodos');
    controller.getFuenteDatosTodos();
    expect(getFuenteDatosTodos).toBeCalled();
    expect(getFuenteDatosTodos).toHaveBeenCalledWith();
    expect(getFuenteDatosTodos).toBeCalledTimes(1);
  });
});
