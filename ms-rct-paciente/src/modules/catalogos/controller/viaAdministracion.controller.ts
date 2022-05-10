import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { ViaAdministracionService } from '../services/via-administracion.service';

@Controller()
export class ViaAdministracionController {
  constructor(private readonly viaAdministracionService: ViaAdministracionService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getViaAdministracionPorId',
  })
  getViaAdministracionPorId(@Payload() id: number) {
    return this.viaAdministracionService.getViaAdministracionPorId(id);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getViaAdministracionTodos',
  })
  getViaAdministracionTodos() {
    return this.viaAdministracionService.getViaAdministracionTodos();
  }
}
