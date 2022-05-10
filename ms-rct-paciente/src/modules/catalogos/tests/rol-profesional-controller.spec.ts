import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { RolProfesionalController } from '../controller/rol-profesional.controller';
import { RolProfesional } from '../entities/rol-profesional.entity';
import { RolProfesionalService } from '../services/rol-profesional.service';
import { DataTest } from './mocks/data-test';
import { RolProfesionalServiceMock } from './mocks/rol-profesional-service-mock';

describe('RolProfesionalController', () => {
  let controller: RolProfesionalController;
  let service: RolProfesionalService;

  beforeEach(async () => {
    const RolProfesionalServiceProvider = {
      provide: RolProfesionalService,
      useClass: RolProfesionalServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolProfesionalController],
      providers: [RolProfesionalService, RolProfesionalServiceProvider],
    })
      .overrideProvider(RolProfesionalService)
      .useClass(RolProfesionalServiceMock)
      .compile();

    controller = module.get<RolProfesionalController>(RolProfesionalController);
    service = module.get<RolProfesionalService>(RolProfesionalService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get rol profesional por id', async () => {
    const data = DataTest.DATA_ROL_PROFESIONAL;
    const rol_profesional = plainToClass(RolProfesional, data);
    const id = data.id;
    expect(await controller.getRolProfesionalPorId(id)).toEqual(
      rol_profesional,
    );

    const getRolProfesionalPorId = jest.spyOn(
      service,
      'getRolProfesionalPorId',
    );
    controller.getRolProfesionalPorId(id);
    expect(getRolProfesionalPorId).toBeCalled();
    expect(getRolProfesionalPorId).toHaveBeenCalledWith(id);
    expect(getRolProfesionalPorId).toBeCalledTimes(1);
  });

  it('should get riesgo medicamento todos', async () => {
    const data = DataTest.DATA_ROL_PROFESIONAL;
    const rol_profesional = plainToClass(RolProfesional, data);
    expect(await controller.getRolProfesionalTodos()).toEqual([
      rol_profesional,
    ]);

    const getRolProfesionalTodos = jest.spyOn(
      service,
      'getRolProfesionalTodos',
    );
    controller.getRolProfesionalTodos();
    expect(getRolProfesionalTodos).toBeCalled();
    expect(getRolProfesionalTodos).toHaveBeenCalledWith();
    expect(getRolProfesionalTodos).toBeCalledTimes(1);
  });
});
