import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class CieService {
  private readonly msCie: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSCie: ClientProxy,
  ) {
    this.msCie = ConstantesConfig.MS_CATALOGO;
  }

  async getCiePorId(id: number) {
    const pattern = { role: this.msCie, cmd: this.getCiePorId.name };
    const payload = id;
    const cie = await firstValueFrom(
      this.clienteMSCie.send(pattern, payload),
    ).catch((err) => manageErrors(this.msCie, err));

    return cie;
  }

  async getCiePorCodigo(codigoCie: string) {
    const pattern = {
      role: this.msCie,
      cmd: this.getCiePorCodigo.name,
    };
    const payload = codigoCie;
    const cie = await firstValueFrom(
      this.clienteMSCie.send(pattern, payload),
    ).catch((err) => manageErrors(this.msCie, err));
    return cie;
  }
}
