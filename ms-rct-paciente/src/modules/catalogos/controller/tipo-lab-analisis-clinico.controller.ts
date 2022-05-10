import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { TipoLabAnalisisClinicoService } from '../services/tipo-lab-analisis-clinico.service';

@Controller()
export class TipoLabAnalisisClinicoController {
  constructor(private readonly tipoLabAnalisisClinicoService: TipoLabAnalisisClinicoService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getTipoLabAnalisisClinicoPorId',
  })
  getTipoLabAnalisisClinicoPorId(@Payload() id: number) {
    return this.tipoLabAnalisisClinicoService.getTipoLabAnalisisClinicoPorId(id);
  }
}
