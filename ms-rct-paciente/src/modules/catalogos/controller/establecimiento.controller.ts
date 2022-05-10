import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { EstablecimientoService } from '../services/establecimiento.service';

@Controller()
export class EstablecimientoController {
  constructor(
    private readonly establecimientoService: EstablecimientoService,
  ) {}

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getEstablecimientoPorId',
  })
  getEstablecimientoPorId(@Payload() id: number) {
    return this.establecimientoService.getEstablecimientoPorId(id);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getEstablecimientoPorUniCodigo',
  })
  getEstablecimientoPorUniCodigo(@Payload() unicodigo: string) {
    return this.establecimientoService.getEstablecimientoPorUniCodigo(
      unicodigo,
    );
  }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getEstablecimientoPorRuc',
  })
  getEstablecimientoPorRuc(@Payload() ruc: string) {
    return this.establecimientoService.getEstablecimientoPorRuc(ruc);
  }
}
