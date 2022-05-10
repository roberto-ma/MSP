import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { CieService } from '../services/cie.service';

@Controller()
export class CieController {
  constructor(private readonly cieService: CieService) {}

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getCiePorId',
  })
  getCiePorId(@Payload() id: number) {
    return this.cieService.getCiePorId(id);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getCiePorCodigo',
  })
  getCiePorCodigo(@Payload() codigoCie: string) {
    return this.cieService.getCiePorCodigo(codigoCie);
  }
}
