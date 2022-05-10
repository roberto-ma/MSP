import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class TipoIdentificacionService {
  private readonly msTipoIdentificacion: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSTipoIdentificacion: ClientProxy,
  ) {
    this.msTipoIdentificacion = ConstantesConfig.MS_CATALOGO;
  }

  async getTipoIdentificacionPorId(id: number) {
    const pattern = {
      role: this.msTipoIdentificacion,
      cmd: this.getTipoIdentificacionPorId.name,
    };
    const payload = id;
    const tipoIdentificacion = await firstValueFrom(
      this.clienteMSTipoIdentificacion.send(pattern, payload),
    ).catch((err) => manageErrors(this.msTipoIdentificacion, err));

    return tipoIdentificacion;
  }

  async getTipoIdentificacionTodos() {
    const pattern = {
      role: this.msTipoIdentificacion,
      cmd: this.getTipoIdentificacionTodos.name,
    };
    const payload = {};
    const tipoIdentificacion = await firstValueFrom(
      this.clienteMSTipoIdentificacion.send(pattern, payload),
    ).catch((err) => manageErrors(this.msTipoIdentificacion, err));
    return tipoIdentificacion;
  }
}
