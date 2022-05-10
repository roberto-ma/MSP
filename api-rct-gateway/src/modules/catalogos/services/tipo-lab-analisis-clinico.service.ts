import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class TipoLabAnalisisClinicoService {
  private readonly msTipoLabAnalisisClinico: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSTipoLabAnalisisClinico: ClientProxy,
  ) {
    this.msTipoLabAnalisisClinico = ConstantesConfig.MS_CATALOGO;
  }

  async getTipoLabAnalisisClinicoPorId(id: number) {
    const pattern = {
      role: this.msTipoLabAnalisisClinico,
      cmd: this.getTipoLabAnalisisClinicoPorId.name,
    };
    const payload = id;
    const tipoLabAnalisisClinico = await firstValueFrom(
      this.clienteMSTipoLabAnalisisClinico.send(pattern, payload),
    ).catch((err) => manageErrors(this.msTipoLabAnalisisClinico, err));

    return tipoLabAnalisisClinico;
  }
}
