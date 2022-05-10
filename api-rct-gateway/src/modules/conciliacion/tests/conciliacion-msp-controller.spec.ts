import { Test, TestingModule } from '@nestjs/testing';

import { ConciliacionMspController } from '../controllers/conciliacion-msp.controller';
import { CreateConciliacionMspDto } from '../dto/conciliacion-msp.dto';
import { ConciliacionMspService } from '../services/conciliacion-msp.service';
import { ConciliacionMspServiceMock } from './mocks/conciliacion-msp-service-mock';
import { EncryptInterceptor } from '../../../interceptors/encrypt.interceptor';
import { EncryptInterceptorMock } from './mocks/encrypt.interceptor-mock';

describe('ConciliacionMspController', () => {
  let controller: ConciliacionMspController;
  let service: ConciliacionMspService;

  beforeEach(async () => {
    const ConciliacionMspServiceProvider = {
      provide: ConciliacionMspService,
      useClass: ConciliacionMspServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConciliacionMspController],
      providers: [ConciliacionMspService, ConciliacionMspServiceProvider],
    })
      .overrideProvider(ConciliacionMspService)
      .useClass(ConciliacionMspServiceMock)
      .overrideInterceptor(EncryptInterceptor)
      .useClass(EncryptInterceptorMock)
      .compile();

    controller = module.get<ConciliacionMspController>(
      ConciliacionMspController,
    );
    service = module.get<ConciliacionMspService>(ConciliacionMspService);
  });

  const testDataConciliacionMsp = [
    {
      zona: 'Z09',
      ruc: '170001212001',
      idEstablecimiento: 1,
      codigoCuadre: '987654321',
      fechaConciliacion: '2022-03-25',
      totalOrdenes: 1,
      totalItems: 6,
      totalValor: 7,
      codigoVerificacion: 207305,
    },
    {
      zona: 'Z08',
      ruc: '1715163214001',
      idEstablecimiento: 2,
      codigoCuadre: '123456789',
      fechaConciliacion: '2022-03-24',
      totalOrdenes: 2,
      totalItems: 8,
      totalValor: 16,
      codigoVerificacion: 258945,
    },
  ];

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a conciliacion MSP', async () => {
    const createConciliacionMspDto =
      testDataConciliacionMsp as CreateConciliacionMspDto[];

    expect(
      await controller.createConciliacion(createConciliacionMspDto),
    ).toEqual({
      id: expect.any(Number),
      ...testDataConciliacionMsp,
    });

    const createConciliacionMspSpy = jest.spyOn(service, 'createConciliacion');
    controller.createConciliacion(createConciliacionMspDto);
    expect(createConciliacionMspSpy).toBeCalled();
    expect(createConciliacionMspSpy).toHaveBeenCalledWith(
      createConciliacionMspDto,
    );
    expect(createConciliacionMspSpy).toBeCalledTimes(1);
  });
});
