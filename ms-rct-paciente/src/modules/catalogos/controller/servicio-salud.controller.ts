import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { ServicioSaludService } from '../services/servicio-salud.service';

@Controller()
export class ServicioSaludController {
  constructor(private readonly servicioSaludService: ServicioSaludService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getServicioSaludPorId',
  })
  getServicioSaludPorId(@Payload() id: number) {
    return this.servicioSaludService.getServicioSaludPorId(id);
  }
}
