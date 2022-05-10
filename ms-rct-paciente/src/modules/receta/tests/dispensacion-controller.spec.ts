import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { DispensacionController } from '../controllers/dispensacion.controller';
import { CreateDispensacionDto } from '../dto/dispensacion.dto';
import { Dispensacion } from '../entities/dispensacion.entity';
import { Receta } from '../entities/receta.entity';
import { DispensacionService } from '../services/dispensacion.service';
import { DataTest } from './mocks/data-test';
import { DispensacionServiceMock } from './mocks/dispensacion-service-mock';

describe('DispensacionController', () => {
  let controller: DispensacionController;
  let service: DispensacionService;

  beforeEach(async () => {
    const DispensacionServiceProvider = {
      provide: DispensacionService,
      useClass: DispensacionServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DispensacionController],
      providers: [DispensacionService, DispensacionServiceProvider],
    })
      .overrideProvider(DispensacionService)
      .useClass(DispensacionServiceMock)
      .compile();

    controller = module.get<DispensacionController>(DispensacionController);
    service = module.get<DispensacionService>(DispensacionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create Dispensación', async () => {
    const data = DataTest.DATA_DISPENSACION;
    const data_dispensacion = plainToClass(CreateDispensacionDto, data);
    const resultado = plainToClass(Dispensacion, data);

    expect(await controller.createDispensacion(data_dispensacion)).toEqual(
      resultado,
    );

    const createDispensacion = jest.spyOn(service, 'createDispensacion');
    controller.createDispensacion(data_dispensacion);
    expect(createDispensacion).toBeCalled();
    expect(createDispensacion).toHaveBeenCalledWith(data_dispensacion);
    expect(createDispensacion).toBeCalledTimes(1);
  });

  it('should get Dispensación por OID', async () => {
    const data = DataTest.DATA_DISPENSACION;
    const oid = data.receta_oid;
    const resultado = plainToClass(Dispensacion, data);

    expect(await controller.getDispensacionPorOid(oid)).toEqual(resultado);

    const getDispensacionPorRecetaOid = jest.spyOn(
      service,
      'getDispensacionPorRecetaOid',
    );
    controller.getDispensacionPorOid(oid);
    expect(getDispensacionPorRecetaOid).toBeCalled();
    expect(getDispensacionPorRecetaOid).toHaveBeenCalledWith(oid);
    expect(getDispensacionPorRecetaOid).toBeCalledTimes(1);
  });

  it('should get Dispensación por OID con Receta', async () => {
    const data = DataTest.DATA_DISPENSACION;
    const oid = data.receta_oid;
    const resultado = plainToClass(Dispensacion, data);

    expect(await controller.getDispensacionPorOidConReceta(oid)).toEqual(
      resultado,
    );

    const getDispensacionPorOidConReceta = jest.spyOn(
      service,
      'getDispensacionPorOidConReceta',
    );
    controller.getDispensacionPorOidConReceta(oid);
    expect(getDispensacionPorOidConReceta).toBeCalled();
    expect(getDispensacionPorOidConReceta).toHaveBeenCalledWith(oid);
    expect(getDispensacionPorOidConReceta).toBeCalledTimes(1);
  });
});
