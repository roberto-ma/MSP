import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { TarifarioService } from '../services/tarifario.service';

@Controller()
export class TarifarioController {
  constructor(private readonly tarifarioService: TarifarioService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getTarifarioPorProductId',
  })
  getTarifarioPorProductId(@Payload() productoId: number) {
    return this.tarifarioService.getTarifarioPorProductId(productoId);
  }
}
