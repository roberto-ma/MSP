import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { LaboratorioFabricanteService } from '../services/laboratorio-fabricante.service';

@Controller()
export class LaboratorioFabricanteController {
  constructor(private readonly laboratorioFabricanteService: LaboratorioFabricanteService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getLaboratorioFabricantePorId',
  })
  getLaboratorioFabricantePorId(@Payload() id: number) {
    return this.laboratorioFabricanteService.getLaboratorioFabricantePorId(id);
  }
}
