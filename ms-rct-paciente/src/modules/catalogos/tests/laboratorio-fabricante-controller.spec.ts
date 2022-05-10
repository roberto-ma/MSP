import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { LaboratorioFabricanteController } from '../controller/laboratorio-fabricante.controller';
import { LaboratorioFabricante } from '../entities/laboratorio-fabricante.entity';
import { LaboratorioFabricanteService } from '../services/laboratorio-fabricante.service';
import { DataTest } from './mocks/data-test';
import { LaboratorioFabricanteServiceMock } from './mocks/laboratorio-fabricante-service-mock';

describe('LaboratorioFabricanteController', () => {
  let controller: LaboratorioFabricanteController;
  let service: LaboratorioFabricanteService;

  beforeEach(async () => {
    const LaboratorioFabricanteServiceProvider = {
      provide: LaboratorioFabricanteService,
      useClass: LaboratorioFabricanteServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LaboratorioFabricanteController],
      providers: [
        LaboratorioFabricanteService,
        LaboratorioFabricanteServiceProvider,
      ],
    })
      .overrideProvider(LaboratorioFabricanteService)
      .useClass(LaboratorioFabricanteServiceMock)
      .compile();

    controller = module.get<LaboratorioFabricanteController>(
      LaboratorioFabricanteController,
    );
    service = module.get<LaboratorioFabricanteService>(
      LaboratorioFabricanteService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get laboratorio fabricante por id', async () => {
    const data = DataTest.DATA_LABORATORIO_FABRICANTE;
    const laboratorio_fabricante = plainToClass(LaboratorioFabricante, data);
    const id = data.id;
    expect(await controller.getLaboratorioFabricantePorId(id)).toEqual(
      laboratorio_fabricante,
    );

    const getLaboratorioFabricantePorId = jest.spyOn(
      service,
      'getLaboratorioFabricantePorId',
    );
    controller.getLaboratorioFabricantePorId(id);
    expect(getLaboratorioFabricantePorId).toBeCalled();
    expect(getLaboratorioFabricantePorId).toHaveBeenCalledWith(id);
    expect(getLaboratorioFabricantePorId).toBeCalledTimes(1);
  });
});
