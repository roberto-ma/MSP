import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { InteraccionesService } from '../services/interacciones.service';

@Controller()
export class InteraccionesController {
  constructor(private readonly interaccionesService: InteraccionesService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getInteraccionesPorId',
  })
  getInteraccionesPorId(@Payload() id: number) {
    return this.interaccionesService.getInteraccionesPorId(id);
  }
}
