import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { TipoEstablecimientoController } from '../controller/tipo-establecimiento.controller';
import { TipoEstablecimiento } from '../entities/tipo-establecimiento.entity';
import { TipoEstablecimientoService } from '../services/tipo-establecimiento.service';
import { DataTest } from './mocks/data-test';
import { TipoEstablecimientoServiceMock } from './mocks/tipo-establecimiento-mock';

describe('TipoEstablecimientoController', () => {
  let controller: TipoEstablecimientoController;
  let service: TipoEstablecimientoService;

  beforeEach(async () => {
    const TipoEstablecimientoServiceProvider = {
      provide: TipoEstablecimientoService,
      useClass: TipoEstablecimientoServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoEstablecimientoController],
      providers: [
        TipoEstablecimientoService,
        TipoEstablecimientoServiceProvider,
      ],
    })
      .overrideProvider(TipoEstablecimientoService)
      .useClass(TipoEstablecimientoServiceMock)
      .compile();

    controller = module.get<TipoEstablecimientoController>(
      TipoEstablecimientoController,
    );
    service = module.get<TipoEstablecimientoService>(
      TipoEstablecimientoService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get tipo establecimiento por id', async () => {
    const data = DataTest.DATA_TIPO_ESTABLECIMIENTO;
    const tipo_establecimiento = plainToClass(TipoEstablecimiento, data);
    const id = data.id;
    expect(await controller.getTipoEstablecimientoPorId(id)).toEqual(
      tipo_establecimiento,
    );

    const getTipoEstablecimientoPorId = jest.spyOn(
      service,
      'getTipoEstablecimientoPorId',
    );
    controller.getTipoEstablecimientoPorId(id);
    expect(getTipoEstablecimientoPorId).toBeCalled();
    expect(getTipoEstablecimientoPorId).toHaveBeenCalledWith(id);
    expect(getTipoEstablecimientoPorId).toBeCalledTimes(1);
  });
});
