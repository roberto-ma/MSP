import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DispensacionService } from '../services/dispensacion.service';
import { CreateDispensacionDto } from '../dto/dispensacion.dto';
import { ConstantesConfig } from '../../../config/constantes-config';

@Controller()
export class DispensacionController {
  constructor(private readonly dispensacionService: DispensacionService) {}

  @MessagePattern({
    role: ConstantesConfig.MS_RCT_PACIENTE,
    cmd: 'createDispensacion',
  })
  createDispensacion(@Payload() createDispensacionDto: CreateDispensacionDto) {
    return this.dispensacionService.createDispensacion(createDispensacionDto);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_RCT_PACIENTE,
    cmd: 'getDispensacionPorOid',
  })
  getDispensacionPorOid(@Payload() recetaOid: string) {
    return this.dispensacionService.getDispensacionPorRecetaOid(recetaOid);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_RCT_PACIENTE,
    cmd: 'getDispensacionPorOidConReceta',
  })
  getDispensacionPorOidConReceta(@Payload() recetaOid: string) {
    return this.dispensacionService.getDispensacionPorOidConReceta(recetaOid);
  }
}
