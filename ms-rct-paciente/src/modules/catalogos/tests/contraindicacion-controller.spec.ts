import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { ContraindicacionController } from '../controller/contraindicacion.controller';
import { Contraindicacion } from '../entities/contraindicacion.entity';
import { ContraindicacionService } from '../services/contraindicacion.service';
import { ContraindicacionServiceMock } from './mocks/contraindicacion-service-mock';
import { DataTest } from './mocks/data-test';

describe('ContraindicacionController', () => {
  let controller: ContraindicacionController;
  let service: ContraindicacionService;

  beforeEach(async () => {
    const ContraindicacionServiceProvider = {
      provide: ContraindicacionService,
      useClass: ContraindicacionServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContraindicacionController],
      providers: [ContraindicacionService, ContraindicacionServiceProvider],
    })
      .overrideProvider(ContraindicacionService)
      .useClass(ContraindicacionServiceMock)
      .compile();

    controller = module.get<ContraindicacionController>(
      ContraindicacionController,
    );
    service = module.get<ContraindicacionService>(ContraindicacionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get contraindicación por id', async () => {
    const data = DataTest.DATA_CONTRAINDICACION;
    const concentracion = plainToClass(Contraindicacion, data);
    const id = data.id;
    expect(await controller.getContraindicacionPorId(id)).toEqual(
      concentracion,
    );

    const getContraindicacionPorId = jest.spyOn(
      service,
      'getContraindicacionPorId',
    );
    controller.getContraindicacionPorId(id);
    expect(getContraindicacionPorId).toBeCalled();
    expect(getContraindicacionPorId).toHaveBeenCalledWith(id);
    expect(getContraindicacionPorId).toBeCalledTimes(1);
  });
});
