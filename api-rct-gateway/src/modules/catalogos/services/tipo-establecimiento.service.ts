import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class TipoEstablecimientoService {
  private readonly msTipoEstablecimiento: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSTipoEstablecimiento: ClientProxy,
  ) {
    this.msTipoEstablecimiento = ConstantesConfig.MS_CATALOGO;
  }

  async getTipoEstablecimientoPorId(id: number) {
    const pattern = {
      role: this.msTipoEstablecimiento,
      cmd: this.getTipoEstablecimientoPorId.name,
    };
    const payload = id;
    const TipoEstablecimiento = await firstValueFrom(
      this.clienteMSTipoEstablecimiento.send(pattern, payload),
    ).catch((err) => manageErrors(this.msTipoEstablecimiento, err));

    return TipoEstablecimiento;
  }
}
