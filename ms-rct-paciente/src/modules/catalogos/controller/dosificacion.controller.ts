import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { DosificacionService } from '../services/dosificacion.service';

@Controller()
export class DosificacionController {
  constructor(private readonly dosificacionService: DosificacionService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getDosificacionPorId',
  })
  getDosificacionPorId(@Payload() id: number) {
    return this.dosificacionService.getDosificacionPorId(id);
  }
}
