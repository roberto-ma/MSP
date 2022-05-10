import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { DispensacionController } from '../controllers/dispensacion.controller';
import {
  CreateDispensacionDto,
  ReadDispensacionDto,
} from '../dto/dispensacion.dto';
import { DispensacionService } from '../services/dispensacion.service';
import { EncryptInterceptorMock } from '../../conciliacion/tests/mocks/encrypt.interceptor-mock';
import { DataTest } from './mocks/data-test';
import { DispensacionServiceMock } from './mocks/dispensacion-service-mock';
import { EncryptInterceptor } from '../../../interceptors/encrypt.interceptor';
import { DispensacionInterceptor } from '../../../interceptors/dispensacion.interceptor';
import { DispensacionInterceptorMock } from './mocks/dispensacion.interceptor-mock';

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
      .overrideInterceptor(EncryptInterceptor)
      .useClass(EncryptInterceptorMock)
      .overrideInterceptor(DispensacionInterceptor)
      .useClass(DispensacionInterceptorMock)
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
    const resultado = plainToClass(ReadDispensacionDto, data);

    expect(await controller.createDispensacion(data_dispensacion)).toEqual(
      resultado,
    );

    const createDispensacion = jest.spyOn(service, 'createDispensacion');
    controller.createDispensacion(data_dispensacion);
    expect(createDispensacion).toBeCalled();
    expect(createDispensacion).toHaveBeenCalledWith(data_dispensacion);
    expect(createDispensacion).toBeCalledTimes(1);
  });
});
