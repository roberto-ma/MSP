import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { ReaccionAdversaController } from '../controller/reaccion-adversa.controller';
import { ReaccionAdversa } from '../entities/reaccion-adversa.entity';
import { ReaccionAdversaService } from '../services/reaccion-adversa.service';
import { DataTest } from './mocks/data-test';
import { ReaccionAdversaServiceMock } from './mocks/reaccion-adversa-service-mock';

describe('ReaccionAdversaController', () => {
  let controller: ReaccionAdversaController;
  let service: ReaccionAdversaService;

  beforeEach(async () => {
    const ReaccionAdversaServiceProvider = {
      provide: ReaccionAdversaService,
      useClass: ReaccionAdversaServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReaccionAdversaController],
      providers: [ReaccionAdversaService, ReaccionAdversaServiceProvider],
    })
      .overrideProvider(ReaccionAdversaService)
      .useClass(ReaccionAdversaServiceMock)
      .compile();

    controller = module.get<ReaccionAdversaController>(
      ReaccionAdversaController,
    );
    service = module.get<ReaccionAdversaService>(ReaccionAdversaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get reaccion adversa por id', async () => {
    const data = DataTest.DATA_REACCION_ADVERSA;
    const reaccion_adversa = plainToClass(ReaccionAdversa, data);
    const id = data.id;
    expect(await controller.getReaccionAdversaPorId(id)).toEqual(
      reaccion_adversa,
    );

    const getReaccionAdversaPorId = jest.spyOn(
      service,
      'getReaccionAdversaPorId',
    );
    controller.getReaccionAdversaPorId(id);
    expect(getReaccionAdversaPorId).toBeCalled();
    expect(getReaccionAdversaPorId).toHaveBeenCalledWith(id);
    expect(getReaccionAdversaPorId).toBeCalledTimes(1);
  });
});
