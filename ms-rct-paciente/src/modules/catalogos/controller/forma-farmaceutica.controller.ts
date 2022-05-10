import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { FormaFarmaceuticaService } from '../services/forma-farmaceutica.service';

@Controller()
export class FormaFarmaceuticaController {
  constructor(private readonly formaFarmaceuticaService: FormaFarmaceuticaService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getFormaFarmaceuticaPorId',
  })
  getFormaFarmaceuticaPorId(@Payload() id: number) {
    return this.formaFarmaceuticaService.getFormaFarmaceuticaPorId(id);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getFormaFarmaceuticaTodos',
  })
  getFormaFarmaceuticaTodos() {
    return this.formaFarmaceuticaService.getFormaFarmaceuticaTodos();
  }
}
