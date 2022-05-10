import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { InstitucionController } from '../controller/institucion.controller';
import { Institucion } from '../entities/institucion.entity';
import { InstitucionService } from '../services/institucion.service';
import { DataTest } from './mocks/data-test';
import { InstitucionServiceMock } from './mocks/institucion-service-mock';

describe('InstitucionController', () => {
  let controller: InstitucionController;
  let service: InstitucionService;

  beforeEach(async () => {
    const InstitucionServiceProvider = {
      provide: InstitucionService,
      useClass: InstitucionServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstitucionController],
      providers: [InstitucionService, InstitucionServiceProvider],
    })
      .overrideProvider(InstitucionService)
      .useClass(InstitucionServiceMock)
      .compile();

    controller = module.get<InstitucionController>(InstitucionController);
    service = module.get<InstitucionService>(InstitucionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get institucion por id', async () => {
    const data = DataTest.DATA_INSTITUCION;
    const institucion = plainToClass(Institucion, data);
    const id = data.id;
    expect(await controller.getInstitucionPorId(id)).toEqual(institucion);

    const getInstitucionPorId = jest.spyOn(service, 'getInstitucionPorId');
    controller.getInstitucionPorId(id);
    expect(getInstitucionPorId).toBeCalled();
    expect(getInstitucionPorId).toHaveBeenCalledWith(id);
    expect(getInstitucionPorId).toBeCalledTimes(1);
  });
});
