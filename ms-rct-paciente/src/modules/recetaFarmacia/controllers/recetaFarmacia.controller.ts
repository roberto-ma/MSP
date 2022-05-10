import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { RecetaImpFarmaciaService } from '../../recetaFarmacia/services/recetaFarmacia.service';

@Controller()
export class RecetaImpFarmaciaController {
  constructor(private readonly recetaImpPaciente: RecetaImpFarmaciaService) {}

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getRecetaPorN',
  })
  getRecetaPorN(@Payload() id: number) {
    return this.recetaImpPaciente.getRecetaPorN(id);
  }
}
