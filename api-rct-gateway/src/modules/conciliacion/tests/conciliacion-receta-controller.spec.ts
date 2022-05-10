import { Test, TestingModule } from '@nestjs/testing';
import { ConciliacionRecetaController } from '../controllers/conciliacion-receta.controller';
import { CreateConciliacionRecetaDto } from '../dto/conciliacion-receta.dto';
import { ConciliacionRecetaService } from '../services/conciliacion-receta.service';
import { ConciliacionRecetaServiceMock } from './mocks/conciliacion-receta-service-mock';
import { EncryptInterceptor } from '../../../interceptors/encrypt.interceptor';
import { EncryptInterceptorMock } from './mocks/encrypt.interceptor-mock';

describe('ConciliacionRecetaController', () => {
  let controller: ConciliacionRecetaController;
  let service: ConciliacionRecetaService;

  beforeEach(async () => {
    const ConciliacionRecetaServiceProvider = {
      provide: ConciliacionRecetaService,
      useClass: ConciliacionRecetaServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConciliacionRecetaController],
      providers: [ConciliacionRecetaService, ConciliacionRecetaServiceProvider],
    })
      .overrideProvider(ConciliacionRecetaService)
      .useClass(ConciliacionRecetaServiceMock)
      .overrideInterceptor(EncryptInterceptor)
      .useClass(EncryptInterceptorMock)
      .compile();

    controller = module.get<ConciliacionRecetaController>(
      ConciliacionRecetaController,
    );
    service = module.get<ConciliacionRecetaService>(ConciliacionRecetaService);
  });

  const testDataConciliacionReceta = [
    {
      codigoUnico: '1.000002.14141440',
      codDispensacion: '123456',
      codigoCuadre: '987654321',
      totalItems: 7,
      valorOrden: 1.81,
    },
    {
      codigoUnico: '1.000002.55555565',
      codDispensacion: '123456',
      codigoCuadre: '987654321',
      totalItems: 7,
      valorOrden: 6,
    },
    {
      codigoUnico: '1.000001.15151650',
      codDispensacion: '0999990',
      codigoCuadre: '123456789',
      totalItems: 2,
      valorOrden: 6,
    },
  ];

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a conciliacion receta', async () => {
    const createConciliacionRecetaDto =
      testDataConciliacionReceta as CreateConciliacionRecetaDto[];

    expect(
      await controller.createConciliacionDetalle(createConciliacionRecetaDto),
    ).toEqual({
      id: expect.any(Number),
      ...testDataConciliacionReceta,
    });

    const createConciliacionMspReceta = jest.spyOn(
      service,
      'validarConciliacionDetalle',
    );
    controller.createConciliacionDetalle(createConciliacionRecetaDto);
    expect(createConciliacionMspReceta).toBeCalled();
    expect(createConciliacionMspReceta).toHaveBeenCalledWith(
      createConciliacionRecetaDto,
    );
    expect(createConciliacionMspReceta).toBeCalledTimes(1);
  });
});
