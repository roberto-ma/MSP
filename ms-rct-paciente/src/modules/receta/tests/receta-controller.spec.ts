import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { RecetaController } from '../controllers/receta.controller';
import { ValidateRecetaDto } from '../dto/receta-validacion.dto';
import { CreateRecetaDto, UpdateAnulacionRecetaDto } from '../dto/receta.dto';
import { Receta } from '../entities/receta.entity';
import { RecetaService } from '../services/receta.service';
import { DataTest } from './mocks/data-test';
import { RecetaServiceMock } from './mocks/receta-service-mock';

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
      .compile();

    controller = module.get<RecetaController>(RecetaController);
    service = module.get<RecetaService>(RecetaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create receta', async () => {
    const data_receta = plainToClass(CreateRecetaDto, DataTest.DATA_RECETA);
    const resultado = plainToClass(Receta, DataTest.DATA_RECETA_PRESCRITA);

    expect(await controller.createReceta(data_receta)).toEqual(resultado);

    const createReceta = jest.spyOn(service, 'createReceta');
    controller.createReceta(data_receta);
    expect(createReceta).toBeCalled();
    expect(createReceta).toHaveBeenCalledWith(data_receta);
    expect(createReceta).toBeCalledTimes(1);
  });

  it('should get Receta por OID', async () => {
    const data = DataTest.DATA_RECETA;
    const receta = plainToClass(Receta, data);
    const oid = data.oid;
    expect(await controller.getRecetaPorOid(oid)).toEqual(receta);

    const getRecetaPorOidConVerificacionEstado = jest.spyOn(
      service,
      'getRecetaPorOidConVerificacionEstado',
    );
    controller.getRecetaPorOid(oid);
    expect(getRecetaPorOidConVerificacionEstado).toBeCalled();
    expect(getRecetaPorOidConVerificacionEstado).toHaveBeenCalledWith(oid);
    expect(getRecetaPorOidConVerificacionEstado).toBeCalledTimes(1);
  });

  it('should get Receta por id', async () => {
    const data = DataTest.DATA_RECETA;
    const receta = plainToClass(Receta, data);
    const id = data.id;
    expect(await controller.getRecetaPorId(id)).toEqual(receta);

    const getRecetaPorId = jest.spyOn(service, 'getRecetaPorId');
    controller.getRecetaPorId(id);
    expect(getRecetaPorId).toBeCalled();
    expect(getRecetaPorId).toHaveBeenCalledWith(id);
    expect(getRecetaPorId).toBeCalledTimes(1);
  });

  it('should get Receta por OID para conciliacion', async () => {
    const data = DataTest.DATA_RECETA;
    const receta = plainToClass(Receta, data);
    const oid = data.oid;
    expect(await controller.getRecetaPorOidParaConciliacion(oid)).toEqual(
      receta,
    );

    const getRecetaPorOid = jest.spyOn(service, 'getRecetaPorOid');
    controller.getRecetaPorOidParaConciliacion(oid);
    expect(getRecetaPorOid).toBeCalled();
    expect(getRecetaPorOid).toHaveBeenCalledWith(oid);
    expect(getRecetaPorOid).toBeCalledTimes(1);
  });

  it('should validate precios receta', async () => {
    const data_receta = plainToClass(
      ValidateRecetaDto,
      DataTest.DATA_VALIDATE_RECETA,
    );
    const resultado = plainToClass(Receta, DataTest.DATA_RECETA);

    expect(await controller.validatePreciosReceta(data_receta)).toEqual(
      resultado,
    );

    const validatePreciosReceta = jest.spyOn(service, 'validatePreciosReceta');
    controller.validatePreciosReceta(data_receta);
    expect(validatePreciosReceta).toBeCalled();
    expect(validatePreciosReceta).toHaveBeenCalledWith(data_receta);
    expect(validatePreciosReceta).toBeCalledTimes(1);
  });

  it('should anulacion receta', async () => {
    const data_receta = plainToClass(
      UpdateAnulacionRecetaDto,
      DataTest.DATA_ANULACION_RECETA,
    );
    const resultado = plainToClass(Receta, DataTest.DATA_RECETA);

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
