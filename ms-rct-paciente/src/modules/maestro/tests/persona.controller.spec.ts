/* eslint-disable prefer-const */
import { Test, TestingModule } from '@nestjs/testing';
import { PersonaController } from '../controllers/persona.controller';
import { PersonaService } from '../services/persona.service';
import { plainToClass } from 'class-transformer';
import { Persona } from '../entities/persona.entity';
import { PersonaServiceMock } from './mocks/persona.service.mock';

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
      .compile();

    controller = module.get<PersonaController>(PersonaController);
    service = module.get<PersonaService>(PersonaService);
  });

  let testDataPersona = {
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
  };

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a persona by identificacion', async () => {
    const persona = plainToClass(Persona, testDataPersona);
    const personaIdentificacion = persona.identificacion;

    expect(
      await controller.getPersonaPorIdentificacion(personaIdentificacion),
    ).toEqual(persona);

    const getPersonaPorIdentificacionSpy = jest.spyOn(
      service,
      'getPersonaPorIdentificacion',
    );
    controller.getPersonaPorIdentificacion(personaIdentificacion);
    expect(getPersonaPorIdentificacionSpy).toBeCalled();
    expect(getPersonaPorIdentificacionSpy).toHaveBeenCalledWith(
      personaIdentificacion,
    );
    expect(getPersonaPorIdentificacionSpy).toBeCalledTimes(1);
  });
});
