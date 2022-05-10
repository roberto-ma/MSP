import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { MedicamentoController } from '../controller/medicamento.controller';
import { OrganicoController } from '../controller/organico.controller';
import { LugarGeografico } from '../entities/lugar-geografico.entity';
import { Medicamento } from '../entities/medicamento.entity';
import { Organico } from '../entities/organico.entity';
import { MedicamentoService } from '../services/medicamento.service';
import { OrganicoService } from '../services/organico.service';
import { DataTest } from './mocks/data-test';
import { MedicamentoServiceMock } from './mocks/medicamento-service-mock';
import { OrganicoServiceMock } from './mocks/organico-service-mock';

describe('OrganicoController', () => {
  let controller: OrganicoController;
  let service: OrganicoService;

  beforeEach(async () => {
    const OrganicoServiceProvider = {
      provide: OrganicoService,
      useClass: OrganicoServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganicoController],
      providers: [OrganicoService, OrganicoServiceProvider],
    })
      .overrideProvider(OrganicoService)
      .useClass(OrganicoServiceMock)
      .compile();

    controller = module.get<OrganicoController>(OrganicoController);
    service = module.get<OrganicoService>(OrganicoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get organico por id', async () => {
    const data = DataTest.DATA_ORGANICO;
    const organico = plainToClass(Organico, data);
    const id = data.id;
    expect(await controller.getOrganicoPorId(id)).toEqual(organico);

    const getOrganicoPorId = jest.spyOn(service, 'getOrganicoPorId');
    controller.getOrganicoPorId(id);
    expect(getOrganicoPorId).toBeCalled();
    expect(getOrganicoPorId).toHaveBeenCalledWith(id);
    expect(getOrganicoPorId).toBeCalledTimes(1);
  });

  it('should get medicamento por CUM', async () => {
    const data = DataTest.DATA_ORGANICO;
    const organico = plainToClass(Organico, data);
    const codigo_circuito = data.codigoCircuito;
    expect(
      await controller.getOrganicoPorCodigoCircuito(codigo_circuito),
    ).toEqual(organico);

    const getOrganicoPorCodigoCircuito = jest.spyOn(
      service,
      'getOrganicoPorCodigoCircuito',
    );
    controller.getOrganicoPorCodigoCircuito(codigo_circuito);
    expect(getOrganicoPorCodigoCircuito).toBeCalled();
    expect(getOrganicoPorCodigoCircuito).toHaveBeenCalledWith(codigo_circuito);
    expect(getOrganicoPorCodigoCircuito).toBeCalledTimes(1);
  });
});
