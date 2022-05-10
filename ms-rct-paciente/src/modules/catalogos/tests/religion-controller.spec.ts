import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { ReligionController } from '../controller/religion.controller';
import { Religion } from '../entities/religion.entity';
import { ReligionService } from '../services/religion.service';
import { DataTest } from './mocks/data-test';
import { ReligionServiceMock } from './mocks/religion-service-mock';

describe('ReligionController', () => {
  let controller: ReligionController;
  let service: ReligionService;

  beforeEach(async () => {
    const ReligionServiceProvider = {
      provide: ReligionService,
      useClass: ReligionServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReligionController],
      providers: [ReligionService, ReligionServiceProvider],
    })
      .overrideProvider(ReligionService)
      .useClass(ReligionServiceMock)
      .compile();

    controller = module.get<ReligionController>(ReligionController);
    service = module.get<ReligionService>(ReligionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get religion por id', async () => {
    const data = DataTest.DATA_RELIGION;
    const religion = plainToClass(Religion, data);
    const id = data.id;
    expect(await controller.getReligionPorId(id)).toEqual(religion);

    const getReligionPorId = jest.spyOn(service, 'getReligionPorId');
    controller.getReligionPorId(id);
    expect(getReligionPorId).toBeCalled();
    expect(getReligionPorId).toHaveBeenCalledWith(id);
    expect(getReligionPorId).toBeCalledTimes(1);
  });

  it('should get religion por codigoPras', async () => {
    const data = DataTest.DATA_RELIGION;
    const religion = plainToClass(Religion, data);
    const codigo_pras = data.codigoPras;
    expect(await controller.getReligionPorCodigoPras(codigo_pras)).toEqual(
      religion,
    );

    const getReligionPorCodigoPras = jest.spyOn(
      service,
      'getReligionPorCodigoPras',
    );
    controller.getReligionPorCodigoPras(codigo_pras);
    expect(getReligionPorCodigoPras).toBeCalled();
    expect(getReligionPorCodigoPras).toHaveBeenCalledWith(codigo_pras);
    expect(getReligionPorCodigoPras).toBeCalledTimes(1);
  });

  it('should get religion todos', async () => {
    const data = DataTest.DATA_RELIGION;
    const religion = plainToClass(Religion, data);
    expect(await controller.getReligionTodos()).toEqual([religion]);

    const getReligionTodos = jest.spyOn(service, 'getReligionTodos');
    controller.getReligionTodos();
    expect(getReligionTodos).toBeCalled();
    expect(getReligionTodos).toHaveBeenCalledWith();
    expect(getReligionTodos).toBeCalledTimes(1);
  });
});
