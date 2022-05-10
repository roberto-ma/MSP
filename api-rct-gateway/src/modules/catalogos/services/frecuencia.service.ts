import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class FrecuenciaService {
  private readonly msFrecuencia: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSFrecuencia: ClientProxy,
  ) {
    this.msFrecuencia = ConstantesConfig.MS_CATALOGO;
  }

  async getFrecuenciaPorId(id: number) {
    const pattern = {
      role: this.msFrecuencia,
      cmd: this.getFrecuenciaPorId.name,
    };
    const payload = id;
    const frecuencia = await firstValueFrom(
      this.clienteMSFrecuencia.send(pattern, payload),
    ).catch((err) => manageErrors(this.msFrecuencia, err));

    return frecuencia;
  }

  async getFrecuenciaTodos() {
    const pattern = {
      role: this.msFrecuencia,
      cmd: this.getFrecuenciaTodos.name,
    };
    const payload = {};
    const frecuencia = await firstValueFrom(
      this.clienteMSFrecuencia.send(pattern, payload),
    ).catch((err) => manageErrors(this.msFrecuencia, err));
    return frecuencia;
  }
}
