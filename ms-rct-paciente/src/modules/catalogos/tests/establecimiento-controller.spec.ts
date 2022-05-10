import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { EstablecimientoController } from '../controller/establecimiento.controller';
import { Establecimiento } from '../entities/establecimiento.entity';
import { EstablecimientoService } from '../services/establecimiento.service';
import { DataTest } from './mocks/data-test';
import { EstablecimientoServiceMock } from './mocks/establecimiento-service-mock';

describe('EstablecimientoController', () => {
  let controller: EstablecimientoController;
  let service: EstablecimientoService;

  beforeEach(async () => {
    const EstablecimientoServiceProvider = {
      provide: EstablecimientoService,
      useClass: EstablecimientoServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstablecimientoController],
      providers: [EstablecimientoService, EstablecimientoServiceProvider],
    })
      .overrideProvider(EstablecimientoService)
      .useClass(EstablecimientoServiceMock)
      .compile();

    controller = module.get<EstablecimientoController>(
      EstablecimientoController,
    );
    service = module.get<EstablecimientoService>(EstablecimientoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get establecimiento por id', async () => {
    const data = DataTest.DATA_ESTABLECIMIENTO;
    const establecimiento = plainToClass(Establecimiento, data);
    const id = data.id;
    expect(await controller.getEstablecimientoPorId(id)).toEqual(
      establecimiento,
    );

    const getEstablecimientoPorId = jest.spyOn(
      service,
      'getEstablecimientoPorId',
    );
    controller.getEstablecimientoPorId(id);
    expect(getEstablecimientoPorId).toBeCalled();
    expect(getEstablecimientoPorId).toHaveBeenCalledWith(id);
    expect(getEstablecimientoPorId).toBeCalledTimes(1);
  });

  it('should get establecimiento por código único', async () => {
    const data = DataTest.DATA_ESTABLECIMIENTO;
    const establecimiento = plainToClass(Establecimiento, data);
    const unicodigo = data.unicodigo;
    expect(await controller.getEstablecimientoPorUniCodigo(unicodigo)).toEqual(
      establecimiento,
    );

    const getEstablecimientoPorUniCodigo = jest.spyOn(
      service,
      'getEstablecimientoPorUniCodigo',
    );
    controller.getEstablecimientoPorUniCodigo(unicodigo);
    expect(getEstablecimientoPorUniCodigo).toBeCalled();
    expect(getEstablecimientoPorUniCodigo).toHaveBeenCalledWith(unicodigo);
    expect(getEstablecimientoPorUniCodigo).toBeCalledTimes(1);
  });

  it('should get establecimiento por RUC', async () => {
    const data = DataTest.DATA_ESTABLECIMIENTO;
    const establecimiento = plainToClass(Establecimiento, data);
    const ruc = data.ruc;
    expect(await controller.getEstablecimientoPorRuc(ruc)).toEqual(
      establecimiento,
    );

    const getEstablecimientoPorRuc = jest.spyOn(
      service,
      'getEstablecimientoPorRuc',
    );
    controller.getEstablecimientoPorRuc(ruc);
    expect(getEstablecimientoPorRuc).toBeCalled();
    expect(getEstablecimientoPorRuc).toHaveBeenCalledWith(ruc);
    expect(getEstablecimientoPorRuc).toBeCalledTimes(1);
  });
});
