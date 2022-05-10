import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { ProductoService } from '../services/producto.service';

@Controller()
export class ProductoController {
  constructor(private readonly productoService: ProductoService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getProductoPorId',
  })
  getProductoPorId(@Payload() id: number) {
    return this.productoService.getProductoPorId(id);
  }
}
