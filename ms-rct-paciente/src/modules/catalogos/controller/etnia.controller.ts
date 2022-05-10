import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { EtniaService } from '../services/etnia.service';

@Controller()
export class EtniaController {
  constructor(private readonly etniaService: EtniaService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getEtniaPorId',
  })
  getEtniaPorId(@Payload() id: number) {
    return this.etniaService.getEtniaPorId(id);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getEtniaPorCodigoPras',
  })
  getEtniaPorCodigoPras(@Payload() codigoPras: string) {
    return this.etniaService.getEtniaPorCodigoPras(codigoPras);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getEtniaTodos',
  })
  getEtniaTodos() {
    return this.etniaService.getEtniaTodos();
  }
}
