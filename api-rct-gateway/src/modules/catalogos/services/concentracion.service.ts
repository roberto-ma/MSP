import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class ConcentracionService {
  private readonly msConcentracion: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSConcentracion: ClientProxy,
  ) {
    this.msConcentracion = ConstantesConfig.MS_CATALOGO;
  }

  async getConcentracionPorId(id: number) {
    const pattern = {
      role: this.msConcentracion,
      cmd: this.getConcentracionPorId.name,
    };
    const payload = id;
    const concentracion = await firstValueFrom(
      this.clienteMSConcentracion.send(pattern, payload),
    ).catch((err) => manageErrors(this.msConcentracion, err));

    return concentracion;
  }

  async getConcentracionTodos() {
    const pattern = {
      role: this.msConcentracion,
      cmd: this.getConcentracionTodos.name,
    };
    const payload = {};
    const Concentracion = await firstValueFrom(
      this.clienteMSConcentracion.send(pattern, payload),
    ).catch((err) => manageErrors(this.msConcentracion, err));
    return Concentracion;
  }
}
