import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class MedicamentoService {
  private readonly msMedicamento: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSMedicamento: ClientProxy,
  ) {
    this.msMedicamento = ConstantesConfig.MS_CATALOGO;
  }

  async getMedicamentoPorId(id: number) {
    const pattern = {
      role: this.msMedicamento,
      cmd: this.getMedicamentoPorId.name,
    };
    const payload = id;
    const medicamento = await firstValueFrom(
      this.clienteMSMedicamento.send(pattern, payload),
    ).catch((err) => manageErrors(this.msMedicamento, err));

    return medicamento;
  }

  async getMedicamentosPorCum(cum: string) {
    const pattern = {
      role: this.msMedicamento,
      cmd: this.getMedicamentosPorCum.name,
    };
    const payload = cum;
    const medicamento = await firstValueFrom(
      this.clienteMSMedicamento.send(pattern, payload),
    ).catch((err) => manageErrors(this.msMedicamento, err));

    return medicamento;
  }

  async getMedicamentosPorAct(act: string) {
    const pattern = {
      role: this.msMedicamento,
      cmd: this.getMedicamentosPorAct.name,
    };
    const payload = act;
    const medicamento = await firstValueFrom(
      this.clienteMSMedicamento.send(pattern, payload),
    ).catch((err) => manageErrors(this.msMedicamento, err));

    return medicamento;
  }
}
