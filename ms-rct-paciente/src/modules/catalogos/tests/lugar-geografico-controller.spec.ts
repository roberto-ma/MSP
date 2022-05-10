import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { LugarGeograficoController } from '../controller/lugar-geografico.controller';
import { LugarGeografico } from '../entities/lugar-geografico.entity';
import { LugarGeograficoService } from '../services/lugar-geografico.service';
import { DataTest } from './mocks/data-test';
import { LugarGeograficoServiceMock } from './mocks/lugar-geografico-service-mock';

describe('LugarGeograficoController', () => {
  let controller: LugarGeograficoController;
  let service: LugarGeograficoService;

  beforeEach(async () => {
    const LugarGeograficoServiceProvider = {
      provide: LugarGeograficoService,
      useClass: LugarGeograficoServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LugarGeograficoController],
      providers: [LugarGeograficoService, LugarGeograficoServiceProvider],
    })
      .overrideProvider(LugarGeograficoService)
      .useClass(LugarGeograficoServiceMock)
      .compile();

    controller = module.get<LugarGeograficoController>(
      LugarGeograficoController,
    );
    service = module.get<LugarGeograficoService>(LugarGeograficoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get lugar geografico por id', async () => {
    const data = DataTest.DATA_LUGAR_GEOGRAFICO;
    const lugar_geografico = plainToClass(LugarGeografico, data);
    const id = data.id;
    expect(await controller.getLugarGeograficoPorId(id)).toEqual(
      lugar_geografico,
    );

    const getLugarGeograficoPorId = jest.spyOn(
      service,
      'getLugarGeograficoPorId',
    );
    controller.getLugarGeograficoPorId(id);
    expect(getLugarGeograficoPorId).toBeCalled();
    expect(getLugarGeograficoPorId).toHaveBeenCalledWith(id);
    expect(getLugarGeograficoPorId).toBeCalledTimes(1);
  });

  it('should get lugar geográfico por código PRAS', async () => {
    const data = DataTest.DATA_LUGAR_GEOGRAFICO;
    const lugar_geografico = plainToClass(LugarGeografico, data);
    const codigoPras = data.codigopras;
    expect(
      await controller.getLugarGeograficoPorCodigoPras(codigoPras),
    ).toEqual(lugar_geografico);

    const getLugarGeograficoPorCodigoPras = jest.spyOn(
      service,
      'getLugarGeograficoPorCodigoPras',
    );
    controller.getLugarGeograficoPorCodigoPras(codigoPras);
    expect(getLugarGeograficoPorCodigoPras).toBeCalled();
    expect(getLugarGeograficoPorCodigoPras).toHaveBeenCalledWith(codigoPras);
    expect(getLugarGeograficoPorCodigoPras).toBeCalledTimes(1);
  });
});
