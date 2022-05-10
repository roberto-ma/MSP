import { Test, TestingModule } from '@nestjs/testing';

import { EncryptInterceptorMock } from '../../conciliacion/tests/mocks/encrypt.interceptor-mock';

import { DataTest } from './mocks/data-test';
import { PersonaController } from '../controllers/persona.controller';
import { PersonaService } from '../services/persona.service';
import { PersonaServiceMock } from './mocks/persona-service-mock';
import { ReadPersonaDto } from '../dto/persona.dto';
import { plainToClass } from 'class-transformer';
import { EncryptInterceptor } from '../../../interceptors/encrypt.interceptor';

describe('PersonaController', () => {
  let controller: PersonaController;
  let service: PersonaService;

  beforeEach(async () => {
    const PersonaServiceProvider = {
      provide: PersonaService,
      useClass: PersonaServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonaController],
      providers: [PersonaService, PersonaServiceProvider],
    })
      .overrideProvider(PersonaService)
      .useClass(PersonaServiceMock)
      .overrideInterceptor(EncryptInterceptor)
      .useClass(EncryptInterceptorMock)
      .compile();

    controller = module.get<PersonaController>(PersonaController);
    service = module.get<PersonaService>(PersonaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get Persona por identificación', async () => {
    const data = DataTest.DATA_PERSONA;
    const data_persona = plainToClass(ReadPersonaDto, data);
    const identificacion = data_persona.identificacion;

    expect(
      await controller.getPersonaPorIdentificacion(identificacion),
    ).toEqual(data_persona);

    const getPersonaPorIdentificacion = jest.spyOn(
      service,
      'getPersonaPorIdentificacion',
    );
    controller.getPersonaPorIdentificacion(identificacion);
    expect(getPersonaPorIdentificacion).toBeCalled();
    expect(getPersonaPorIdentificacion).toHaveBeenCalledWith(identificacion);
    expect(getPersonaPorIdentificacion).toBeCalledTimes(1);
  });

  // it('should get Paciente por identificación', async () => {
  //   const data = DataTest.DATA_PACIENTE;
  //   const data_paciente = plainToClass(CreatePacienteDto, data);
  //   const identificacion = data_paciente.persona.identificacion;

  //   expect(
  //     await controller.getPacientePorIdentificacion(identificacion),
  //   ).toEqual({
  //     id: expect.any(Number),
  //     ...data_paciente,
  //   });

  //   const getPacientePorIdentificacion = jest.spyOn(
  //     service,
  //     'getPacientePorIdentificacion',
  //   );
  //   controller.getPacientePorIdentificacion(identificacion);
  //   expect(getPacientePorIdentificacion).toBeCalled();
  //   expect(getPacientePorIdentificacion).toHaveBeenCalledWith(identificacion);
  //   expect(getPacientePorIdentificacion).toBeCalledTimes(1);
  // });
});
