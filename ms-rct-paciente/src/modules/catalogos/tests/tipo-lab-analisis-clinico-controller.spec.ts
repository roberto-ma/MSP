import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { TipoLabAnalisisClinicoController } from '../controller/tipo-lab-analisis-clinico.controller';
import { TipoLabAnalisisClinico } from '../entities/tipo-lab-analisis-clinico.entity';
import { TipoLabAnalisisClinicoService } from '../services/tipo-lab-analisis-clinico.service';
import { DataTest } from './mocks/data-test';
import { TipoLabAnalisisClinicoServiceMock } from './mocks/tipo-lab-analisis-clinico-mock';

describe('TipoLabAnalisisClinicoController', () => {
  let controller: TipoLabAnalisisClinicoController;
  let service: TipoLabAnalisisClinicoService;

  beforeEach(async () => {
    const TipoLabAnalisisClinicoServiceProvider = {
      provide: TipoLabAnalisisClinicoService,
      useClass: TipoLabAnalisisClinicoServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoLabAnalisisClinicoController],
      providers: [
        TipoLabAnalisisClinicoService,
        TipoLabAnalisisClinicoServiceProvider,
      ],
    })
      .overrideProvider(TipoLabAnalisisClinicoService)
      .useClass(TipoLabAnalisisClinicoServiceMock)
      .compile();

    controller = module.get<TipoLabAnalisisClinicoController>(
      TipoLabAnalisisClinicoController,
    );
    service = module.get<TipoLabAnalisisClinicoService>(
      TipoLabAnalisisClinicoService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get tipo lab analisi clinico por id', async () => {
    const data = DataTest.DATA_TIPO_LAB_ANALISIS_CLINICO;
    const tipo_lab = plainToClass(TipoLabAnalisisClinico, data);
    const id = data.id;
    expect(await controller.getTipoLabAnalisisClinicoPorId(id)).toEqual(
      tipo_lab,
    );

    const getTipoLabAnalisisClinicoPorId = jest.spyOn(
      service,
      'getTipoLabAnalisisClinicoPorId',
    );
    controller.getTipoLabAnalisisClinicoPorId(id);
    expect(getTipoLabAnalisisClinicoPorId).toBeCalled();
    expect(getTipoLabAnalisisClinicoPorId).toHaveBeenCalledWith(id);
    expect(getTipoLabAnalisisClinicoPorId).toBeCalledTimes(1);
  });
});
