import { Test, TestingModule } from '@nestjs/testing';
import { EncryptInterceptor } from '../../../interceptors/encrypt.interceptor';

import { ConciliacionDetalleController } from '../controllers/conciliacion-detalle.controller';
import { ConciliacionDetalleService } from '../services/conciliacion-detalle.service';
import { ConciliacionDetalleServiceMock } from './mocks/conciliacion-receta-detalle-mock';
import { EncryptInterceptorMock } from './mocks/encrypt.interceptor-mock';

describe('ConciliacionDetalleController', () => {
  let controller: ConciliacionDetalleController;
  let service: ConciliacionDetalleService;

  beforeEach(async () => {
    const ConciliacionDetalleServiceProvider = {
      provide: ConciliacionDetalleService,
      useClass: ConciliacionDetalleServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConciliacionDetalleController],
      providers: [
        ConciliacionDetalleService,
        ConciliacionDetalleServiceProvider,
      ],
    })
      .overrideProvider(ConciliacionDetalleService)
      .useClass(ConciliacionDetalleServiceMock)
      .overrideInterceptor(EncryptInterceptor)
      .useClass(EncryptInterceptorMock)
      .compile();

    controller = module.get<ConciliacionDetalleController>(
      ConciliacionDetalleController,
    );
    service = module.get<ConciliacionDetalleService>(
      ConciliacionDetalleService,
    );
  });
  const codigoCuadre = '21568';

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a conciliacion receta', async () => {
    expect(
      await controller.getFacturaDetalleConciliacion(codigoCuadre),
    ).toEqual({
      codigoCuadre,
    });

    const createConciliacionDetalle = jest.spyOn(
      service,
      'getFacturaDetalleConciliacion',
    );
    controller.getFacturaDetalleConciliacion(codigoCuadre);
    expect(createConciliacionDetalle).toBeCalled();
    expect(createConciliacionDetalle).toHaveBeenCalledWith(codigoCuadre);
    expect(createConciliacionDetalle).toBeCalledTimes(1);
  });
});
