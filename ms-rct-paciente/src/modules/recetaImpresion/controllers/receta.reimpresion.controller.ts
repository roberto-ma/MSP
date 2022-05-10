/**
 * @ Author: Roberto Maldonado
 * @ Create Time: 2022-05-03 16:50:00
 * @ Description:
 */

import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { RecetaReImpService } from '../services/receta.reimpresion.service';

@Controller()
export class RecetaReImpController {
  constructor(private readonly recteReImpService: RecetaReImpService) {}

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getRecetaActivaTodos',
  })
  getRecetaActivaTodos(@Payload() Identificador: number) {
    return this.recteReImpService.getRecetaActivaTodos(Identificador);
  }
}
