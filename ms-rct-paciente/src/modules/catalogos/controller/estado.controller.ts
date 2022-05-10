import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { EstadoService } from '../services/estado.service';

@Controller()
export class EstadoController {
  constructor(private readonly estadoService: EstadoService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getEstadoPorId',
  })
  getEstadoPorId(@Payload() id: number) {
    return this.estadoService.getEstadoPorId(id);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getEstadoTodos',
  })
  getEstadoTodos() {
    return this.estadoService.getEstadoTodos();
  }
}
