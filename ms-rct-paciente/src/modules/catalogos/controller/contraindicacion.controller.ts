import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { ContraindicacionService } from '../services/contraindicacion.service';

@Controller()
export class ContraindicacionController {
  constructor(private readonly contraindicacionService: ContraindicacionService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getContraindicacionPorId',
  })
  getContraindicacionPorId(@Payload() id: number) {
    return this.contraindicacionService.getContraindicacionPorId(id);
  }
}
