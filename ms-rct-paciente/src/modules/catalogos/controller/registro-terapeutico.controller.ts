import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { RegistroTerapeuticoService } from '../services/registro-terapeuttico.service';

@Controller()
export class RegistroTerapeuticoController {
  constructor(private readonly registroTerapeuticoService: RegistroTerapeuticoService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getRegistroTerapeuticoPorId',
  })
  getRegistroTerapeuticoPorId(@Payload() id: number) {
    return this.registroTerapeuticoService.getRegistroTerapeuticoPorId(id);
  }
}
