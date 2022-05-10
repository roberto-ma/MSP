import { Test, TestingModule } from '@nestjs/testing';

import { EncryptInterceptorMock } from '../../conciliacion/tests/mocks/encrypt.interceptor-mock';
import { plainToClass } from 'class-transformer';
import { DataTest } from './mocks/data-test';
import { ProfesionalSaludController } from '../controllers/profesional-salud.controller';
import { ProfesionalSaludService } from '../services/profesional-salud.service';
import { ProfesionalSaludServiceMock } from './mocks/profesional-salud-service-mock';
import { EncryptInterceptor } from '../../../interceptors/encrypt.interceptor';
import {
  CreateProfesionalSaludDto,
  ReadProfesionalSaludDto,
} from '../dto/profesional-salud.dto';

describe('ProfesionalSaludController', () => {
  let controller: ProfesionalSaludController;
  let service: ProfesionalSaludService;

  beforeEach(async () => {
    const ProfesionalSaludServiceProvider = {
      provide: ProfesionalSaludService,
      useClass: ProfesionalSaludServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfesionalSaludController],
      providers: [ProfesionalSaludService, ProfesionalSaludServiceProvider],
    })
      .overrideProvider(ProfesionalSaludService)
      .useClass(ProfesionalSaludServiceMock)
      .overrideInterceptor(EncryptInterceptor)
      .useClass(EncryptInterceptorMock)
      .compile();

    controller = module.get<ProfesionalSaludController>(
      ProfesionalSaludController,
    );
    service = module.get<ProfesionalSaludService>(ProfesionalSaludService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create Profesional de Salud', async () => {
    const data = DataTest.DATA_PROFESIONAL_SALUD;

    const data_profesional_salud = plainToClass(
      CreateProfesionalSaludDto,
      data,
    );

    expect(
      await controller.createProfesionalSalud(data_profesional_salud),
    ).toEqual({
      id: expect.any(Number),
      ...data_profesional_salud,
    });

    const createProfesionalSalud = jest.spyOn(
      service,
      'createProfesionalSalud',
    );
    controller.createProfesionalSalud(data_profesional_salud);
    expect(createProfesionalSalud).toBeCalled();
    expect(createProfesionalSalud).toHaveBeenCalledWith(data_profesional_salud);
    expect(createProfesionalSalud).toBeCalledTimes(1);
  });

  it('should get Profesional de Salud por identificación', async () => {
    const data = DataTest.DATA_PROFESIONAL_SALUD;
    const data_profesional_salud = plainToClass(ReadProfesionalSaludDto, data);
    const identificacion = data_profesional_salud.persona.identificacion;

    expect(
      await controller.getProfesionalSaludPorIdentificacion(identificacion),
    ).toEqual({
      id: expect.any(Number),
      ...data_profesional_salud,
    });

    const getProfesionalSaludPorIdentificacion = jest.spyOn(
      service,
      'getProfesionalSaludPorIdentificacion',
    );
    controller.getProfesionalSaludPorIdentificacion(identificacion);
    expect(getProfesionalSaludPorIdentificacion).toBeCalled();
    expect(getProfesionalSaludPorIdentificacion).toHaveBeenCalledWith(
      identificacion,
    );
    expect(getProfesionalSaludPorIdentificacion).toBeCalledTimes(1);
  });
});
