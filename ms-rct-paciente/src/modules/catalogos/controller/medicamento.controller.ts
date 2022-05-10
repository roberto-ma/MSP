import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes-config';
import { MedicamentoService } from '../services/medicamento.service';

@Controller()
export class MedicamentoController {
  constructor(private readonly medicamentoService: MedicamentoService) { }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getMedicamentoPorId',
  })
  getMedicamentoPorId(@Payload() id: number) {
    return this.medicamentoService.getMedicamentoPorId(id);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getMedicamentosPorCum',
  })
  getMedicamentosPorCum(@Payload() cum: string) {
    return this.medicamentoService.getMedicamentosPorCum(cum);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_CATALOGO,
    cmd: 'getMedicamentosPorAct',
  })
  getMedicamentosPorAct(@Payload() cum: string) {
    return this.medicamentoService.getMedicamentosPorAct(cum);
  }
}
