import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { FormaFarmaceuticaController } from '../controller/forma-farmaceutica.controller';
import { FormaFarmaceutica } from '../entities/forma-farmaceutica.entity';
import { FormaFarmaceuticaService } from '../services/forma-farmaceutica.service';
import { DataTest } from './mocks/data-test';
import { FormaFarmaceuticaServiceMock } from './mocks/forma-farmaceutica-service-mock';

describe('FormaFarmaceuticaController', () => {
  let controller: FormaFarmaceuticaController;
  let service: FormaFarmaceuticaService;

  beforeEach(async () => {
    const FormaFarmaceuticaServiceProvider = {
      provide: FormaFarmaceuticaService,
      useClass: FormaFarmaceuticaServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormaFarmaceuticaController],
      providers: [FormaFarmaceuticaService, FormaFarmaceuticaServiceProvider],
    })
      .overrideProvider(FormaFarmaceuticaService)
      .useClass(FormaFarmaceuticaServiceMock)
      .compile();

    controller = module.get<FormaFarmaceuticaController>(
      FormaFarmaceuticaController,
    );
    service = module.get<FormaFarmaceuticaService>(FormaFarmaceuticaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get forma farmaceutica por id', async () => {
    const data = DataTest.DATA_FORMA_FARMACEUTICA;
    const forma_farmaceutica = plainToClass(FormaFarmaceutica, data);
    const id = data.id;
    expect(await controller.getFormaFarmaceuticaPorId(id)).toEqual(
      forma_farmaceutica,
    );

    const getFormaFarmaceuticaPorId = jest.spyOn(
      service,
      'getFormaFarmaceuticaPorId',
    );
    controller.getFormaFarmaceuticaPorId(id);
    expect(getFormaFarmaceuticaPorId).toBeCalled();
    expect(getFormaFarmaceuticaPorId).toHaveBeenCalledWith(id);
    expect(getFormaFarmaceuticaPorId).toBeCalledTimes(1);
  });

  it('should get forma farmaceutica todos', async () => {
    const data = DataTest.DATA_FORMA_FARMACEUTICA;
    const forma_famaceutica = plainToClass(FormaFarmaceutica, data);
    expect(await controller.getFormaFarmaceuticaTodos()).toEqual([
      forma_famaceutica,
    ]);

    const getFormaFarmaceuticaTodos = jest.spyOn(
      service,
      'getFormaFarmaceuticaTodos',
    );
    controller.getFormaFarmaceuticaTodos();
    expect(getFormaFarmaceuticaTodos).toBeCalled();
    expect(getFormaFarmaceuticaTodos).toHaveBeenCalledWith();
    expect(getFormaFarmaceuticaTodos).toBeCalledTimes(1);
  });
});
