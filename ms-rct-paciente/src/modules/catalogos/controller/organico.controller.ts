import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { OrganicoService } from '../services/organico.service';

@Controller()
export class OrganicoController {
  constructor(private readonly organicoService: OrganicoService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getOrganicoPorId',
  })
  getOrganicoPorId(@Payload() id: number) {
    return this.organicoService.getOrganicoPorId(id);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getOrganicoPorCodigoCircuito',
  })
  getOrganicoPorCodigoCircuito(@Payload() codigoCircuito: string) {
    return this.organicoService.getOrganicoPorCodigoCircuito(codigoCircuito);
  }
}
