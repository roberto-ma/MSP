import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { FarmaciaService } from '../services/farmacia.service';

@Controller()
export class FarmaciaController {
  constructor(private readonly farmaciaService: FarmaciaService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getFarmaciaPorId',
  })
  getFarmaciaPorId(@Payload() id: number) {
    return this.farmaciaService.getFarmaciaPorId(id);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getFarmaciaPorRuc',
  })
  getFarmaciaPorRuc(@Payload() ruc: string) {
    return this.farmaciaService.getFarmaciaPorRuc(ruc);
  }
}
