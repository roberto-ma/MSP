import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { RolProfesionalService } from '../services/rol-profesional.service';

@Controller()
export class RolProfesionalController {
  constructor(private readonly rolProfesionalService: RolProfesionalService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getRolProfesionalPorId',
  })
  getRolProfesionalPorId(@Payload() id: number) {
    return this.rolProfesionalService.getRolProfesionalPorId(id);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getRolProfesionalTodos',
  })
  getRolProfesionalTodos() {
    return this.rolProfesionalService.getRolProfesionalTodos();
  }
}
