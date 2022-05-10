import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class OrganicoService {
  private readonly msOrganico: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSOrganico: ClientProxy,
  ) {
    this.msOrganico = ConstantesConfig.MS_CATALOGO;
  }

  async getOrganicoPorId(id: number) {
    const pattern = {
      role: this.msOrganico,
      cmd: this.getOrganicoPorId.name,
    };
    const payload = id;
    const organico = await firstValueFrom(
      this.clienteMSOrganico.send(pattern, payload),
    ).catch((err) => manageErrors(this.msOrganico, err));

    return organico;
  }

  async getOrganicoPorCodigoCircuito(codigoCircuito: string) {
    const pattern = {
      role: this.msOrganico,
      cmd: this.getOrganicoPorCodigoCircuito.name,
    };
    const payload = codigoCircuito;
    const organico = await firstValueFrom(
      this.clienteMSOrganico.send(pattern, payload),
    ).catch((err) => manageErrors(this.msOrganico, err));

    return organico;
  }
}
