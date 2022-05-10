import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { CadenaFarmaciaService } from '../services/cadena-farmacia.service';

@Controller()
export class CadenaFarmaciaController {
  constructor(private readonly cadenaFarmaciaService: CadenaFarmaciaService) {}

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getCadenaFarmaciaPorId',
  })
  getCadenaFarmaciaPorId(@Payload() id: number) {
    return this.cadenaFarmaciaService.getCadenaFarmaciaPorId(id);
  }
}
