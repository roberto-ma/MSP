import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { InstitucionService } from '../services/institucion.service';

@Controller()
export class InstitucionController {
  constructor(private readonly institucionService: InstitucionService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getInstitucionPorId',
  })
  getInstitucionPorId(@Payload() id: number) {
    return this.institucionService.getInstitucionPorId(id);
  }
}
