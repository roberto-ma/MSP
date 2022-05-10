import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { RiesgoMedicamentoController } from '../controller/riesgomedicamento.controller';
import { RiesgoMedicamento } from '../entities/riesgomedicamento.entity';
import { RiesgoMedicamentoService } from '../services/riesgomedicamento.service';
import { DataTest } from './mocks/data-test';
import { RiesgoMedicamentoServiceMock } from './mocks/riesgo-medicamento-service-mock';

describe('RiesgoMedicamentoController', () => {
  let controller: RiesgoMedicamentoController;
  let service: RiesgoMedicamentoService;

  beforeEach(async () => {
    const RiesgoMedicamentoServiceProvider = {
      provide: RiesgoMedicamentoService,
      useClass: RiesgoMedicamentoServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiesgoMedicamentoController],
      providers: [RiesgoMedicamentoService, RiesgoMedicamentoServiceProvider],
    })
      .overrideProvider(RiesgoMedicamentoService)
      .useClass(RiesgoMedicamentoServiceMock)
      .compile();

    controller = module.get<RiesgoMedicamentoController>(
      RiesgoMedicamentoController,
    );
    service = module.get<RiesgoMedicamentoService>(RiesgoMedicamentoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get riesgo medicamento por id', async () => {
    const data = DataTest.DATA_RIESGO_MEDICAMENTO;
    const riesgomedicamento = plainToClass(RiesgoMedicamento, data);
    const id = data.id;
    expect(await controller.getRiesgoMedicamentoPorId(id)).toEqual(
      riesgomedicamento,
    );

    const getRiesgoMedicamentoPorId = jest.spyOn(
      service,
      'getRiesgoMedicamentoPorId',
    );
    controller.getRiesgoMedicamentoPorId(id);
    expect(getRiesgoMedicamentoPorId).toBeCalled();
    expect(getRiesgoMedicamentoPorId).toHaveBeenCalledWith(id);
    expect(getRiesgoMedicamentoPorId).toBeCalledTimes(1);
  });

  it('should get riesgo medicamento todos', async () => {
    const data = DataTest.DATA_RIESGO_MEDICAMENTO;
    const riesgo_medicamento = plainToClass(RiesgoMedicamento, data);
    expect(await controller.getRiesgoMedicamentoTodos()).toEqual([
      riesgo_medicamento,
    ]);

    const getRiesgoMedicamentoTodos = jest.spyOn(
      service,
      'getRiesgoMedicamentoTodos',
    );
    controller.getRiesgoMedicamentoTodos();
    expect(getRiesgoMedicamentoTodos).toBeCalled();
    expect(getRiesgoMedicamentoTodos).toHaveBeenCalledWith();
    expect(getRiesgoMedicamentoTodos).toBeCalledTimes(1);
  });
});
