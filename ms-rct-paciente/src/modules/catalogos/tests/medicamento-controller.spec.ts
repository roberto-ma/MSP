import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { MedicamentoController } from '../controller/medicamento.controller';
import { Medicamento } from '../entities/medicamento.entity';
import { MedicamentoService } from '../services/medicamento.service';
import { DataTest } from './mocks/data-test';
import { MedicamentoServiceMock } from './mocks/medicamento-service-mock';

describe('MedicamentoController', () => {
  let controller: MedicamentoController;
  let service: MedicamentoService;

  beforeEach(async () => {
    const MedicamentoServiceProvider = {
      provide: MedicamentoService,
      useClass: MedicamentoServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicamentoController],
      providers: [MedicamentoService, MedicamentoServiceProvider],
    })
      .overrideProvider(MedicamentoService)
      .useClass(MedicamentoServiceMock)
      .compile();

    controller = module.get<MedicamentoController>(MedicamentoController);
    service = module.get<MedicamentoService>(MedicamentoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get medicamento por id', async () => {
    const data = DataTest.DATA_MEDICAMENTO;
    const medicamento = plainToClass(Medicamento, data);
    const id = data.id;
    expect(await controller.getMedicamentoPorId(id)).toEqual(medicamento);

    const getMedicamentoPorId = jest.spyOn(service, 'getMedicamentoPorId');
    controller.getMedicamentoPorId(id);
    expect(getMedicamentoPorId).toBeCalled();
    expect(getMedicamentoPorId).toHaveBeenCalledWith(id);
    expect(getMedicamentoPorId).toBeCalledTimes(1);
  });

  it('should get medicamento por CUM', async () => {
    const data = DataTest.DATA_MEDICAMENTO;
    const medicamento = plainToClass(Medicamento, data);
    const cum = data.codigopras;
    expect(await controller.getMedicamentosPorCum(cum)).toEqual(medicamento);

    const getMedicamentosPorCum = jest.spyOn(service, 'getMedicamentosPorCum');
    controller.getMedicamentosPorCum(cum);
    expect(getMedicamentosPorCum).toBeCalled();
    expect(getMedicamentosPorCum).toHaveBeenCalledWith(cum);
    expect(getMedicamentosPorCum).toBeCalledTimes(1);
  });

  it('should get medicamento por ACT', async () => {
    const data = DataTest.DATA_MEDICAMENTO;
    const medicamento = plainToClass(Medicamento, data);
    const act = data.codigopras;
    expect(await controller.getMedicamentosPorCum(act)).toEqual(medicamento);

    const getMedicamentosPorAct = jest.spyOn(service, 'getMedicamentosPorAct');
    controller.getMedicamentosPorAct(act);
    expect(getMedicamentosPorAct).toBeCalled();
    expect(getMedicamentosPorAct).toHaveBeenCalledWith(act);
    expect(getMedicamentosPorAct).toBeCalledTimes(1);
  });
});
