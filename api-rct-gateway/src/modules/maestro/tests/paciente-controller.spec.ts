import { Test, TestingModule } from '@nestjs/testing';

import { EncryptInterceptorMock } from './../../conciliacion/tests/mocks/encrypt.interceptor-mock';

import { plainToClass } from 'class-transformer';
import { PacienteController } from '../controllers/paciente.controller';
import { PacienteService } from '../services/paciente.service';
import { PacienteServiceMock } from './mocks/paciente-service-mock';
import { DataTest } from './mocks/data-test';
import { CreatePacienteDto } from '../dto/paciente.dto';
import { EncryptInterceptor } from '../../../interceptors/encrypt.interceptor';

describe('PacienteController', () => {
  let controller: PacienteController;
  let service: PacienteService;

  beforeEach(async () => {
    const PacienteServiceProvider = {
      provide: PacienteService,
      useClass: PacienteServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PacienteController],
      providers: [PacienteService, PacienteServiceProvider],
    })
      .overrideProvider(PacienteService)
      .useClass(PacienteServiceMock)
      .overrideInterceptor(EncryptInterceptor)
      .useClass(EncryptInterceptorMock)
      .compile();

    controller = module.get<PacienteController>(PacienteController);
    service = module.get<PacienteService>(PacienteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create Paciente', async () => {
    const data = DataTest.DATA_PACIENTE;
    const data_paciente = plainToClass(CreatePacienteDto, data);

    expect(await controller.createPaciente(data_paciente)).toEqual({
      id: expect.any(Number),
      ...data_paciente,
    });

    const createPaciente = jest.spyOn(service, 'createPaciente');
    controller.createPaciente(data_paciente);
    expect(createPaciente).toBeCalled();
    expect(createPaciente).toHaveBeenCalledWith(data_paciente);
    expect(createPaciente).toBeCalledTimes(1);
  });

  it('should get Paciente por identificación', async () => {
    const data = DataTest.DATA_PACIENTE;
    const data_paciente = plainToClass(CreatePacienteDto, data);
    const identificacion = data_paciente.persona.identificacion;

    expect(
      await controller.getPacientePorIdentificacion(identificacion),
    ).toEqual({
      id: expect.any(Number),
      ...data_paciente,
    });

    const getPacientePorIdentificacion = jest.spyOn(
      service,
      'getPacientePorIdentificacion',
    );
    controller.getPacientePorIdentificacion(identificacion);
    expect(getPacientePorIdentificacion).toBeCalled();
    expect(getPacientePorIdentificacion).toHaveBeenCalledWith(identificacion);
    expect(getPacientePorIdentificacion).toBeCalledTimes(1);
  });
});
