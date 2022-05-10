import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { ReligionService } from '../services/religion.service';

@Controller()
export class ReligionController {
  constructor(private readonly religionService: ReligionService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getReligionPorId',
  })
  getReligionPorId(@Payload() id: number) {
    return this.religionService.getReligionPorId(id);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getReligionPorCodigoPras',
  })
  getReligionPorCodigoPras(@Payload() codigoPras: string) {
    return this.religionService.getReligionPorCodigoPras(codigoPras);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getReligionTodos',
  })
  getReligionTodos() {
    return this.religionService.getReligionTodos();
  }
}
