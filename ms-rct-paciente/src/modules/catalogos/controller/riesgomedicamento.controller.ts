import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { RiesgoMedicamentoService } from '../services/riesgomedicamento.service';

@Controller()
export class RiesgoMedicamentoController {
  constructor(
    private readonly riesgoMedicamentoService: RiesgoMedicamentoService,
  ) {}

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getRiesgoMedicamentoPorId',
  })
  getRiesgoMedicamentoPorId(@Payload() id: number) {
    return this.riesgoMedicamentoService.getRiesgoMedicamentoPorId(id);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getRiesgoMedicamentoTodos',
  })
  getRiesgoMedicamentoTodos() {
    return this.riesgoMedicamentoService.getRiesgoMedicamentoTodos();
  }
}
