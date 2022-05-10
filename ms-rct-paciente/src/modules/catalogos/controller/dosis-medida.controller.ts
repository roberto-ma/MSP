import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { DosisMedidaService } from '../services/dosis-medida.service';

@Controller()
export class DosisMedidaController {
  constructor(private readonly dosisMedidaService: DosisMedidaService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getDosisMedidaPorId',
  })
  getDosisMedidaPorId(@Payload() id: number) {
    return this.dosisMedidaService.getDosisMedidaPorId(id);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getDosisMedidaTodos',
  })
  getDosisMedidaTodos() {
    return this.dosisMedidaService.getDosisMedidaTodos();
  }
}
