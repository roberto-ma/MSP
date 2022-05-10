import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { LugarGeograficoService } from '../services/lugar-geografico.service';

@Controller()
export class LugarGeograficoController {
  constructor(private readonly lugarGeograficoService: LugarGeograficoService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getLugarGeograficoPorId',
  })
  getLugarGeograficoPorId(@Payload() id: number) {
    return this.lugarGeograficoService.getLugarGeograficoPorId(id);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getLugarGeograficoPorId',
  })
  getLugarGeograficoPorCodigoPras(@Payload() codigoPras: string) {
    return this.lugarGeograficoService.getLugarGeograficoPorCodigoPras(codigoPras);
  }
}
