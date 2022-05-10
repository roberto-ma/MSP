import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { NivelPrescripcionService } from '../services/nivel-prescripcion.service';

@Controller()
export class NivelPrescripcionController {
  constructor(private readonly nivelPrescripcionService: NivelPrescripcionService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getNivelPrescripcionPorId',
  })
  getNivelPrescripcionPorId(@Payload() id: number) {
    return this.nivelPrescripcionService.getNivelPrescripcionPorId(id);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getNivelPrescripcionTodos',
  })
  getNivelPrescripcionTodos() {
    return this.nivelPrescripcionService.getNivelPrescripcionTodos();
  }
}
