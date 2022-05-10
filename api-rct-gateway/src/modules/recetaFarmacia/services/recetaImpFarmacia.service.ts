import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';
import { error } from 'console';

@Injectable()
export class RecetaImpFarmaciaService {
  private readonly msRecetaReImp: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly cMSRecetaReImp: ClientProxy,
  ) {
    this.msRecetaReImp = ConstantesConfig.MS_CATALOGO;
  }

  async getRecetaPorN(Id: number) {
    const pattern = {
      role: this.msRecetaReImp,
      cmd: this.getRecetaPorN.name,
    };
    const payload = Id;
    const recetaImp = await firstValueFrom(
      this.cMSRecetaReImp.send(pattern, payload),
    ).catch((err) => manageErrors(this.msRecetaReImp, err.error));
    return recetaImp;
  }
}
