/* eslint-disable prefer-const */
import { Test, TestingModule } from '@nestjs/testing';
import { ProfesionalSaludController } from '../controllers/profesional-salud.controller';
import { ProfesionalSaludService } from '../services/profesional-salud.service';
import { CreateProfesionalSaludDto } from '../dto/profesional-salud.dto';
import { plainToClass } from 'class-transformer';
import { ProfesionalSalud } from '../entities/profesional-salud.entity';
import { ProfesionalSaludServiceMock } from './mocks/profesional-salud.service.mock';

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
      .compile();

    controller = module.get<ProfesionalSaludController>(
      ProfesionalSaludController,
    );
    service = module.get<ProfesionalSaludService>(ProfesionalSaludService);
  });

  let testDataProfesionalSalud = {
    persona_id: 1688095,
    codigo_acess: '12345678915',
    especialidad_id: 1,
    rol_profesional_id: 1,
    establecimiento_id: 1,
    itinerante: 1,
    psicotropico: 1,
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

  it('should create a profesionalSalud', async () => {
    const createProfesionalSaludDto =
      testDataProfesionalSalud as CreateProfesionalSaludDto;
    const profesionalSalud = plainToClass(
      ProfesionalSalud,
      createProfesionalSaludDto,
    );

    expect(
      await controller.createProfesionalSalud(createProfesionalSaludDto),
    ).toEqual({
      persona_id: expect.any(Number),
      ...profesionalSalud,
    });

    const createProfesionalSaludSpy = jest.spyOn(
      service,
      'createProfesionalSalud',
    );
    controller.createProfesionalSalud(createProfesionalSaludDto);
    expect(createProfesionalSaludSpy).toBeCalled();
    expect(createProfesionalSaludSpy).toHaveBeenCalledWith(
      createProfesionalSaludDto,
    );
    expect(createProfesionalSaludSpy).toBeCalledTimes(1);
  });

  it('should get a profesionalSalud by id', async () => {
    const profesionalSalud = plainToClass(
      ProfesionalSalud,
      testDataProfesionalSalud,
    );
    const profesionalSaludId = profesionalSalud.persona.id;

    expect(
      await controller.getProfesionalSaludPorId(profesionalSaludId),
    ).toEqual(profesionalSalud);

    const getProfesionalSaludPorIdSpy = jest.spyOn(
      service,
      'getProfesionalSaludPorId',
    );
    controller.getProfesionalSaludPorId(profesionalSaludId);
    expect(getProfesionalSaludPorIdSpy).toBeCalled();
    expect(getProfesionalSaludPorIdSpy).toHaveBeenCalledWith(
      profesionalSaludId,
    );
    expect(getProfesionalSaludPorIdSpy).toBeCalledTimes(1);
  });

  it('should get a profesionalSalud by identificacion', async () => {
    const profesionalSalud = plainToClass(
      ProfesionalSalud,
      testDataProfesionalSalud,
    );
    const profesionalSaludIdentificacion =
      profesionalSalud.persona.identificacion;

    expect(
      await controller.getProfesionalSaludPorIdentificacion(
        profesionalSaludIdentificacion,
      ),
    ).toEqual(profesionalSalud);

    const getProfesionalSaludPorIdentificacionSpy = jest.spyOn(
      service,
      'getProfesionalSaludPorIdentificacion',
    );
    controller.getProfesionalSaludPorIdentificacion(
      profesionalSaludIdentificacion,
    );
    expect(getProfesionalSaludPorIdentificacionSpy).toBeCalled();
    expect(getProfesionalSaludPorIdentificacionSpy).toHaveBeenCalledWith(
      profesionalSaludIdentificacion,
    );
    expect(getProfesionalSaludPorIdentificacionSpy).toBeCalledTimes(1);
  });
});
