import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { FrecuenciaService } from '../services/frecuencia.service';

@Controller()
export class FrecuenciaController {
  constructor(private readonly frecuenciaService: FrecuenciaService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getFrecuenciaPorId',
  })
  getFrecuenciaPorId(@Payload() id: number) {
    return this.frecuenciaService.getFrecuenciaPorId(id);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getFrecuenciaTodos',
  })
  getFrecuenciaTodos() {
    return this.frecuenciaService.getFrecuenciaTodos();
  }
}
