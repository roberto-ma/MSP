import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { TipoIdentificacionService } from '../services/tipo-identificacion.service';

@Controller()
export class TipoIdentificacionController {
  constructor(private readonly tipoIdentificacionService: TipoIdentificacionService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getTipoIdentificacionPorId',
  })
  getTipoIdentificacionPorId(@Payload() id: number) {
    return this.tipoIdentificacionService.getTipoIdentificacionPorId(id);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getTipoIdentificacionTodos',
  })
  getTipoIdentificacionTodos() {
    return this.tipoIdentificacionService.getTipoIdentificacionTodos();
  }
}
