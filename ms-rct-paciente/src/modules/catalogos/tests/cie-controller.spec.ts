import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { CieController } from '../controller/cie.controller';
import { Cie } from '../entities/cie.entity';
import { CieService } from '../services/cie.service';
import { CieServiceMock } from './mocks/cie-service-mock';
import { DataTest } from './mocks/data-test';

describe('CieController', () => {
  let controller: CieController;
  let service: CieService;

  beforeEach(async () => {
    const CieServiceProvider = {
      provide: CieService,
      useClass: CieServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CieController],
      providers: [CieService, CieServiceProvider],
    })
      .overrideProvider(CieService)
      .useClass(CieServiceMock)
      .compile();

    controller = module.get<CieController>(CieController);
    service = module.get<CieService>(CieService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get CIE por id', async () => {
    const data = DataTest.DATA_CIE;
    const cie = plainToClass(Cie, data);
    const id = data.id;
    expect(await controller.getCiePorId(id)).toEqual(cie);

    const getCiePorId = jest.spyOn(service, 'getCiePorId');
    controller.getCiePorId(id);
    expect(getCiePorId).toBeCalled();
    expect(getCiePorId).toHaveBeenCalledWith(id);
    expect(getCiePorId).toBeCalledTimes(1);
  });

  it('should get CIE por código', async () => {
    const data = DataTest.DATA_CIE;
    const cie = plainToClass(Cie, data);
    const codigoCie = data.codigoCie;
    expect(await controller.getCiePorCodigo(codigoCie)).toEqual(cie);

    const getCiePorCodigo = jest.spyOn(service, 'getCiePorCodigo');
    controller.getCiePorCodigo(codigoCie);
    expect(getCiePorCodigo).toBeCalled();
    expect(getCiePorCodigo).toHaveBeenCalledWith(codigoCie);
    expect(getCiePorCodigo).toBeCalledTimes(1);
  });
});
