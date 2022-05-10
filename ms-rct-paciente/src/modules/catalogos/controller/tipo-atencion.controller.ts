import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { TipoAtencionService } from '../services/tipo-atencion.service';

@Controller()
export class TipoAtencionController {
  constructor(private readonly tipoAtencionService: TipoAtencionService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getTipoAtencionPorId',
  })
  getTipoAtencionPorId(@Payload() id: number) {
    return this.tipoAtencionService.getTipoAtencionPorId(id);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getTipoAtencionTodos',
  })
  getTipoAtencionTodos() {
    return this.tipoAtencionService.getTipoAtencionTodos();
  }
}
