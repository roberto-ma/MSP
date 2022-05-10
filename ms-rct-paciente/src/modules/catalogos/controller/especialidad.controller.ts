import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { EspecialidadService } from '../services/especialidad.service';

@Controller()
export class EspecialidadController {
  constructor(private readonly especialidadService: EspecialidadService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getEspecialidadPorId',
  })
  getEspecialidadPorId(@Payload() id: number) {
    return this.especialidadService.getEspecialidadPorId(id);
  }
}
