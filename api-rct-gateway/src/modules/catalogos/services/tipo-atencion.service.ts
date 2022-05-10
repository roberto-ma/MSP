import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class TipoAtencionService {
  private readonly msTipoAtencion: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSTipoAtencion: ClientProxy,
  ) {
    this.msTipoAtencion = ConstantesConfig.MS_CATALOGO;
  }

  async getTipoAtencionPorId(id: number) {
    const pattern = {
      role: this.msTipoAtencion,
      cmd: this.getTipoAtencionPorId.name,
    };
    const payload = id;
    const tipoAtencion = await firstValueFrom(
      this.clienteMSTipoAtencion.send(pattern, payload),
    ).catch((err) => manageErrors(this.msTipoAtencion, err));

    return tipoAtencion;
  }

  async getTipoAtencionTodos() {
    const pattern = {
      role: this.msTipoAtencion,
      cmd: this.getTipoAtencionTodos.name,
    };
    const payload = {};
    const tipoAtencion = await firstValueFrom(
      this.clienteMSTipoAtencion.send(pattern, payload),
    ).catch((err) => manageErrors(this.msTipoAtencion, err));
    return tipoAtencion;
  }
}
