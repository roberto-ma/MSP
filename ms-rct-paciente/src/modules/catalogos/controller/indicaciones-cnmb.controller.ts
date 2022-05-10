import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { IndicacionesCnmbService } from '../services/indicaciones-cnmb.service';

@Controller()
export class IndicacionesCnmbController {
  constructor(private readonly indicacionesCnmbService: IndicacionesCnmbService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getIndicacionesCnmbPorId',
  })
  getIndicacionesCnmbPorId(@Payload() id: number) {
    return this.indicacionesCnmbService.getIndicacionesCnmbPorId(id);
  }
}
