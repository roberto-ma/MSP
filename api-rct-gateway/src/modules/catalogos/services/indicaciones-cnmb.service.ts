import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class IndicacionesCnmbService {
  private readonly msIndicacionesCnmb: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSIndicacionesCnmb: ClientProxy,
  ) {
    this.msIndicacionesCnmb = ConstantesConfig.MS_CATALOGO;
  }

  async getIndicacionesCnmbPorId(id: number) {
    const pattern = {
      role: this.msIndicacionesCnmb,
      cmd: this.getIndicacionesCnmbPorId.name,
    };
    const payload = id;
    const indicacionesCnmb = await firstValueFrom(
      this.clienteMSIndicacionesCnmb.send(pattern, payload),
    ).catch((err) => manageErrors(this.msIndicacionesCnmb, err));

    return indicacionesCnmb;
  }
}
