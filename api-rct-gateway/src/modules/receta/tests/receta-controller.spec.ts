import { Test, TestingModule } from '@nestjs/testing';

import { RecetaController } from '../controllers/receta.controller';
import { RecetaService } from '../services/receta.service';
import { RecetaServiceMock } from './mocks/receta-service-mock';
import { EncryptInterceptorMock } from '../../conciliacion/tests/mocks/encrypt.interceptor-mock';
import { DataTest } from './mocks/data-test';
import { plainToClass } from 'class-transformer';
import { EncryptInterceptor } from '../../../interceptors/encrypt.interceptor';
import { DispensacionInterceptor } from '../../../interceptors/dispensacion.interceptor';
import { DispensacionInterceptorMock } from './mocks/dispensacion.interceptor-mock';
import {
  CreateRecetaPrescritaDto,
  CreateRecetaValidadaDto,
  ReadRecetaDto,
  ReadRecetaSimpleDto,
  UpdateAnulacionRecetaDto,
} from '../dto/receta.dto';
import {
  ReadRecetaAutorizadaDto,
  ValidateRecetaDto,
} from '../dto/receta-validacion.dto';

describe('RecetaController', () => {
  let controller: RecetaController;
  let service: RecetaService;

  beforeEach(async () => {
    const RecetaServiceProvider = {
      provide: RecetaService,
      useClass: RecetaServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecetaController],
      providers: [RecetaService, RecetaServiceProvider],
    })
      .overrideProvider(RecetaService)
      .useClass(RecetaServiceMock)
      .overrideInterceptor(EncryptInterceptor)
      .useClass(EncryptInterceptorMock)
      .overrideInterceptor(DispensacionInterceptor)
      .useClass(DispensacionInterceptorMock)
      .compile();

    controller = module.get<RecetaController>(RecetaController);
    service = module.get<RecetaService>(RecetaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get Receta por OID', async () => {
    const data = DataTest.DATA_RECETA;
    const receta = plainToClass(ReadRecetaDto, data);
    const oid = data.oid;
    expect(await controller.getRecetaPorOid(oid)).toEqual(receta);

    const getRecetaPorOid = jest.spyOn(service, 'getRecetaPorOid');
    controller.getRecetaPorOid(oid);
    expect(getRecetaPorOid).toBeCalled();
    expect(getRecetaPorOid).toHaveBeenCalledWith(oid);
    expect(getRecetaPorOid).toBeCalledTimes(1);
  });

  it('should create receta prescrita', async () => {
    const data_receta = plainToClass(
      CreateRecetaPrescritaDto,
      DataTest.DATA_RECETA_PRESCRITA,
    );
    const resultado = plainToClass(
      ReadRecetaSimpleDto,
      DataTest.DATA_RECETA_PRESCRITA,
    );

    expect(await controller.createRecetaPreescrita(data_receta)).toEqual(
      resultado,
    );

    const createReceta = jest.spyOn(service, 'createReceta');
    controller.createRecetaPreescrita(data_receta);
    expect(createReceta).toBeCalled();
    expect(createReceta).toHaveBeenCalledWith(data_receta);
    expect(createReceta).toBeCalledTimes(1);
  });

  it('should validate precios receta', async () => {
    const data_receta = plainToClass(
      ValidateRecetaDto,
      DataTest.DATA_VALIDATE_RECETA,
    );
    const resultado = plainToClass(
      ReadRecetaAutorizadaDto,
      DataTest.DATA_RECETA,
    );

    expect(await controller.validatePreciosReceta(data_receta)).toEqual(
      resultado,
    );

    const validatePreciosReceta = jest.spyOn(service, 'validatePreciosReceta');
    controller.validatePreciosReceta(data_receta);
    expect(validatePreciosReceta).toBeCalled();
    expect(validatePreciosReceta).toHaveBeenCalledWith(data_receta);
    expect(validatePreciosReceta).toBeCalledTimes(1);
  });

  it('should create receta validada', async () => {
    const data_receta = plainToClass(
      CreateRecetaValidadaDto,
      DataTest.DATA_RECETA,
    );
    const resultado = plainToClass(
      ReadRecetaSimpleDto,
      DataTest.DATA_RECETA_PRESCRITA,
    );

    expect(await controller.createRecetaValidada(data_receta)).toEqual(
      resultado,
    );

    const createReceta = jest.spyOn(service, 'createReceta');
    controller.createRecetaPreescrita(data_receta);
    expect(createReceta).toBeCalled();
    expect(createReceta).toHaveBeenCalledWith(data_receta);
    expect(createReceta).toBeCalledTimes(1);
  });

  it('should anulacion receta', async () => {
    const data_receta = plainToClass(
      UpdateAnulacionRecetaDto,
      DataTest.DATA_ANULACION_RECETA,
    );
    const resultado = plainToClass(ReadRecetaSimpleDto, DataTest.DATA_RECETA);

    expect(await controller.updateAnulacionReceta(data_receta)).toEqual(
      resultado,
    );

    const updateAnulacionReceta = jest.spyOn(service, 'updateAnulacionReceta');
    controller.updateAnulacionReceta(data_receta);
    expect(updateAnulacionReceta).toBeCalled();
    expect(updateAnulacionReceta).toHaveBeenCalledWith(data_receta);
    expect(updateAnulacionReceta).toBeCalledTimes(1);
  });
});
