import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { TipoEstablecimientoService } from '../services/tipo-establecimiento.service';

@Controller()
export class TipoEstablecimientoController {
  constructor(private readonly tipoEstablecimientoService: TipoEstablecimientoService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getTipoEstablecimientoPorId',
  })
  getTipoEstablecimientoPorId(@Payload() id: number) {
    return this.tipoEstablecimientoService.getTipoEstablecimientoPorId(id);
  }
}
