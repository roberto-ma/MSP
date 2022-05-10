/* eslint-disable prefer-const */
import { Test, TestingModule } from '@nestjs/testing';
import { PacienteController } from '../controllers/paciente.controller';
import { PacienteService } from '../services/paciente.service';
import { CreatePacienteDto } from '../dto/paciente.dto';
import { plainToClass } from 'class-transformer';
import { Paciente } from '../entities/paciente.entity';
import { PacienteServiceMock } from './mocks/paciente.service.mock';

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
      .compile();

    controller = module.get<PacienteController>(PacienteController);
    service = module.get<PacienteService>(PacienteService);
  });

  let testDataPaciente = {
    persona_id: 1688095,
    residencia: 'Pueblo Unido',
    lugar_residencia_id: 40101,
    tipo_telefono: 'M',
    telefono: '0302010203',
    email: 'pcarrion@gmail.com',
    alergia: 'nignuna',
    persona: {
      id: 1688095,
      tipo_identificacion_id: 2,
      identificacion: '12345678915',
      apellidos: 'Carrion',
      nombres: 'Pedro',
      sexo: 'H',
      etnia_id: 1,
      religion_id: 1,
      lugar_nacimiento_id: 40101,
      discapacitado: '0',
      porcentaje_discapacidad: 0,
      pais_id: 1,
      fecha_nacimiento: new Date('1996-05-20'),
      vivo: 1,
      activo: 1,
    },
  };

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a paciente', async () => {
    const createPacienteDto = testDataPaciente as CreatePacienteDto;
    const paciente = plainToClass(Paciente, createPacienteDto);

    expect(await controller.createPaciente(createPacienteDto)).toEqual({
      persona_id: expect.any(Number),
      ...paciente,
    });

    const createPacienteSpy = jest.spyOn(service, 'createPaciente');
    controller.createPaciente(createPacienteDto);
    expect(createPacienteSpy).toBeCalled();
    expect(createPacienteSpy).toHaveBeenCalledWith(createPacienteDto);
    expect(createPacienteSpy).toBeCalledTimes(1);
  });

  it('should get a paciente by id', async () => {
    const paciente = plainToClass(Paciente, testDataPaciente);
    const pacienteId = paciente.persona.id;

    expect(await controller.getPacientePorId(pacienteId)).toEqual(paciente);

    const getPacientePorIdSpy = jest.spyOn(service, 'getPacientePorId');
    controller.getPacientePorId(pacienteId);
    expect(getPacientePorIdSpy).toBeCalled();
    expect(getPacientePorIdSpy).toHaveBeenCalledWith(pacienteId);
    expect(getPacientePorIdSpy).toBeCalledTimes(1);
  });

  it('should get a paciente by identificacion', async () => {
    const paciente = plainToClass(Paciente, testDataPaciente);
    const pacienteIdentificacion = paciente.persona.identificacion;

    expect(
      await controller.getPacientePorIdentificacion(pacienteIdentificacion),
    ).toEqual(paciente);

    const getPacientePorIdentificacionSpy = jest.spyOn(
      service,
      'getPacientePorIdentificacion',
    );
    controller.getPacientePorIdentificacion(pacienteIdentificacion);
    expect(getPacientePorIdentificacionSpy).toBeCalled();
    expect(getPacientePorIdentificacionSpy).toHaveBeenCalledWith(
      pacienteIdentificacion,
    );
    expect(getPacientePorIdentificacionSpy).toBeCalledTimes(1);
  });
});
