import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { ConcentracionService } from '../services/concentracion.service';

@Controller()
export class ConcentracionController {
  constructor(private readonly concentracionService: ConcentracionService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getConcentracionPorId',
  })
  getConcentracionPorId(@Payload() id: number) {
    return this.concentracionService.getConcentracionPorId(id);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getConcentracionTodos',
  })
  getConcentracionTodos() {
    return this.concentracionService.getConcentracionTodos();
  }
}
