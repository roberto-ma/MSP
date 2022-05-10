import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { EstadoController } from '../controller/estado.controller';
import { NivelPrescripcionController } from '../controller/nivel-prescripcion.controller';
import { Estado } from '../entities/estadoreceta.entity';
import { NivelPrescripcion } from '../entities/nivel-prescripcion.entity';
import { EstadoService } from '../services/estado.service';
import { NivelPrescripcionService } from '../services/nivel-prescripcion.service';
import { DataTest } from './mocks/data-test';
import { EstadoServiceMock } from './mocks/estado-service-mock';
import { NivelPrescripcionServiceMock } from './mocks/nivel-prescripcion-service-mock';

describe('NivelPrescripcionController', () => {
  let controller: NivelPrescripcionController;
  let service: NivelPrescripcionService;

  beforeEach(async () => {
    const NivelPrescripcionServiceProvider = {
      provide: NivelPrescripcionService,
      useClass: NivelPrescripcionServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [NivelPrescripcionController],
      providers: [NivelPrescripcionService, NivelPrescripcionServiceProvider],
    })
      .overrideProvider(NivelPrescripcionService)
      .useClass(NivelPrescripcionServiceMock)
      .compile();

    controller = module.get<NivelPrescripcionController>(
      NivelPrescripcionController,
    );
    service = module.get<NivelPrescripcionService>(NivelPrescripcionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get nivel prescripción por id', async () => {
    const data = DataTest.DATA_NIVEL_PRESCRIPCION;
    const nivel_prescripcion = plainToClass(Estado, data);
    const id = data.id;
    expect(await controller.getNivelPrescripcionPorId(id)).toEqual(
      nivel_prescripcion,
    );

    const getNivelPrescripcionPorId = jest.spyOn(
      service,
      'getNivelPrescripcionPorId',
    );
    controller.getNivelPrescripcionPorId(id);
    expect(getNivelPrescripcionPorId).toBeCalled();
    expect(getNivelPrescripcionPorId).toHaveBeenCalledWith(id);
    expect(getNivelPrescripcionPorId).toBeCalledTimes(1);
  });

  it('should get nivel prescripción todos', async () => {
    const data = DataTest.DATA_NIVEL_PRESCRIPCION;
    const nivel_prescripcion = plainToClass(NivelPrescripcion, data);
    expect(await controller.getNivelPrescripcionTodos()).toEqual([
      nivel_prescripcion,
    ]);

    const getNivelPrescripcionTodos = jest.spyOn(
      service,
      'getNivelPrescripcionTodos',
    );
    controller.getNivelPrescripcionTodos();
    expect(getNivelPrescripcionTodos).toBeCalled();
    expect(getNivelPrescripcionTodos).toHaveBeenCalledWith();
    expect(getNivelPrescripcionTodos).toBeCalledTimes(1);
  });
});
