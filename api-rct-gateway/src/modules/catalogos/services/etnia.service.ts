import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class EtniaService {
  private readonly msEtnia: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSEtnia: ClientProxy,
  ) {
    this.msEtnia = ConstantesConfig.MS_CATALOGO;
  }

  async getEtniaPorId(id: number) {
    const pattern = {
      role: this.msEtnia,
      cmd: this.getEtniaPorId.name,
    };
    const payload = id;
    const etnia = await firstValueFrom(
      this.clienteMSEtnia.send(pattern, payload),
    ).catch((err) => manageErrors(this.msEtnia, err));

    return etnia;
  }

  async getEtniaPorCodigoPras(codigoPras: string) {
    const pattern = {
      role: this.msEtnia,
      cmd: this.getEtniaPorCodigoPras.name,
    };
    const payload = codigoPras;
    const etnia = await firstValueFrom(
      this.clienteMSEtnia.send(pattern, payload),
    ).catch((err) => manageErrors(this.msEtnia, err));

    return etnia;
  }

  async getEtniaTodos() {
    const pattern = {
      role: this.msEtnia,
      cmd: this.getEtniaTodos.name,
    };
    const payload = {};
    const etnia = await firstValueFrom(
      this.clienteMSEtnia.send(pattern, payload),
    ).catch((err) => manageErrors(this.msEtnia, err));
    return etnia;
  }
}
