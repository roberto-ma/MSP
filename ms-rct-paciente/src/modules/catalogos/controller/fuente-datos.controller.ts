import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { FuenteDatosService } from '../services/fuente-datos.service';

@Controller()
export class FuenteDatosController {
  constructor(private readonly fuenteDatosService: FuenteDatosService) {}

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getFuenteDatosPorId',
  })
  getFuenteDatosPorId(@Payload() id: number) {
    return this.fuenteDatosService.getFuenteDatosPorId(id);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getFuenteDatosTodos',
  })
  getFuenteDatosTodos() {
    return this.fuenteDatosService.getFuenteDatosTodos();
  }
}
