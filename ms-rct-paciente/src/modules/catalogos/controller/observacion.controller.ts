import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { ObservacionService } from '../services/observacion.service';

@Controller()
export class ObservacionController {
  constructor(private readonly observacionService: ObservacionService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getObservacionPorId',
  })
  getObservacionPorId(@Payload() id: number) {
    return this.observacionService.getObservacionPorId(id);
  }
}
