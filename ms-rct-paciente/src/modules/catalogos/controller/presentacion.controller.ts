import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { PresentacionService } from '../services/presentacion.service';

@Controller()
export class PresentacionController {
  constructor(private readonly presentacionService: PresentacionService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getPresentacionPorId',
  })
  getPresentacionPorId(@Payload() id: number) {
    return this.presentacionService.getPresentacionPorId(id);
  }
}
