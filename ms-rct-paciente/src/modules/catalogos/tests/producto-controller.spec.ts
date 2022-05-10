import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { ProductoController } from '../controller/producto.controller';
import { Producto } from '../entities/producto.entity';
import { ProductoService } from '../services/producto.service';
import { DataTest } from './mocks/data-test';
import { ProductoServiceMock } from './mocks/producto-service-mock';

describe('ProductoController', () => {
  let controller: ProductoController;
  let service: ProductoService;

  beforeEach(async () => {
    const ProductoServiceProvider = {
      provide: ProductoService,
      useClass: ProductoServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductoController],
      providers: [ProductoService, ProductoServiceProvider],
    })
      .overrideProvider(ProductoService)
      .useClass(ProductoServiceMock)
      .compile();

    controller = module.get<ProductoController>(ProductoController);
    service = module.get<ProductoService>(ProductoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get producto por id', async () => {
    const data = DataTest.DATA_PRODUCTO;
    const producto = plainToClass(Producto, data);
    const id = data.id;
    expect(await controller.getProductoPorId(id)).toEqual(producto);

    const getProductoPorId = jest.spyOn(service, 'getProductoPorId');
    controller.getProductoPorId(id);
    expect(getProductoPorId).toBeCalled();
    expect(getProductoPorId).toHaveBeenCalledWith(id);
    expect(getProductoPorId).toBeCalledTimes(1);
  });
});
