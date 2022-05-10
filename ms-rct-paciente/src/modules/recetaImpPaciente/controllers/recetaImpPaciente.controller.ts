/**
 * @ Author: Roberto Maldonado
 * @ Create Time: 2022-05-03 16:50:00
 * @ Description:
 */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { RecetaImpPacienteService } from '../services/recetaImpPaciente.service';

@Controller()
export class RecetaImpPacienteController {
  constructor(private readonly recetaImpPaciente: RecetaImpPacienteService) {}

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getRecetaPorN',
  })
  getRecetaPorN(@Payload() id: number) {
    return this.recetaImpPaciente.getRecetaPorN(id);
  }
}
