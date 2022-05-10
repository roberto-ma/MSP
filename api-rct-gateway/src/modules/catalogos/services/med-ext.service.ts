import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class MedExtService {
  private readonly msMedExt: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSMedExt: ClientProxy,
  ) {
    this.msMedExt = ConstantesConfig.MS_CATALOGO;
  }

  async getMedExtPorId(id: number) {
    const pattern = {
      role: this.msMedExt,
      cmd: this.getMedExtPorId.name,
    };
    const payload = id;
    const MedExt = await firstValueFrom(
      this.clienteMSMedExt.send(pattern, payload),
    ).catch((err) => manageErrors(this.msMedExt, err));

    return MedExt;
  }

  async getMedExtsPorCum(cum: string) {
    const pattern = {
      role: this.msMedExt,
      cmd: this.getMedExtsPorCum.name,
    };
    const payload = cum;
    const MedExt = await firstValueFrom(
      this.clienteMSMedExt.send(pattern, payload),
    ).catch((err) => manageErrors(this.msMedExt, err));

    return MedExt;
  }

  async getMedExtsPorAct(act: string) {
    const pattern = {
      role: this.msMedExt,
      cmd: this.getMedExtsPorAct.name,
    };
    const payload = act;
    const MedExt = await firstValueFrom(
      this.clienteMSMedExt.send(pattern, payload),
    ).catch((err) => manageErrors(this.msMedExt, err));

    return MedExt;
  }
}
