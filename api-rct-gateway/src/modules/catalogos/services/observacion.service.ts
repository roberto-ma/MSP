import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class ObservacionService {
  private readonly msObservacion: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSObservacion: ClientProxy,
  ) {
    this.msObservacion = ConstantesConfig.MS_CATALOGO;
  }

  async getObservacionPorId(id: number) {
    const pattern = {
      role: this.msObservacion,
      cmd: this.getObservacionPorId.name,
    };
    const payload = id;
    const observacion = await firstValueFrom(
      this.clienteMSObservacion.send(pattern, payload),
    ).catch((err) => manageErrors(this.msObservacion, err));

    return observacion;
  }
}
