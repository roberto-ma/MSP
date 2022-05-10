import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { RegistroTerapeuticoController } from '../controller/registro-terapeutico.controller';
import { RegistroTerapeutico } from '../entities/registro-terapeutico.entity';
import { RegistroTerapeuticoService } from '../services/registro-terapeuttico.service';
import { DataTest } from './mocks/data-test';
import { RegistroTerapeuticoServiceMock } from './mocks/registro-terapeutico-service-mock';

describe('ReaccionAdversaController', () => {
  let controller: RegistroTerapeuticoController;
  let service: RegistroTerapeuticoService;

  beforeEach(async () => {
    const RegistroTerapeuticoServiceProvider = {
      provide: RegistroTerapeuticoService,
      useClass: RegistroTerapeuticoServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistroTerapeuticoController],
      providers: [
        RegistroTerapeuticoService,
        RegistroTerapeuticoServiceProvider,
      ],
    })
      .overrideProvider(RegistroTerapeuticoService)
      .useClass(RegistroTerapeuticoServiceMock)
      .compile();

    controller = module.get<RegistroTerapeuticoController>(
      RegistroTerapeuticoController,
    );
    service = module.get<RegistroTerapeuticoService>(
      RegistroTerapeuticoService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get registro terapeutico por id', async () => {
    const data = DataTest.DATA_REGISTRO_TERAPEUTICO;
    const registro_terapeutico = plainToClass(RegistroTerapeutico, data);
    const id = data.id;
    expect(await controller.getRegistroTerapeuticoPorId(id)).toEqual(
      registro_terapeutico,
    );

    const getRegistroTerapeuticoPorId = jest.spyOn(
      service,
      'getRegistroTerapeuticoPorId',
    );
    controller.getRegistroTerapeuticoPorId(id);
    expect(getRegistroTerapeuticoPorId).toBeCalled();
    expect(getRegistroTerapeuticoPorId).toHaveBeenCalledWith(id);
    expect(getRegistroTerapeuticoPorId).toBeCalledTimes(1);
  });
});
