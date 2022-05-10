import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class ContraindicacionService {
  private readonly msContraindicacion: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSContraindicacion: ClientProxy,
  ) {
    this.msContraindicacion = ConstantesConfig.MS_CATALOGO;
  }

  async getContraindicacionPorId(id: number) {
    const pattern = {
      role: this.msContraindicacion,
      cmd: this.getContraindicacionPorId.name,
    };
    const payload = id;
    const contraindicacion = await firstValueFrom(
      this.clienteMSContraindicacion.send(pattern, payload),
    ).catch((err) => manageErrors(this.msContraindicacion, err));

    return contraindicacion;
  }

  async getContraindicacionTodos() {
    const pattern = {
      role: this.msContraindicacion,
      cmd: this.getContraindicacionTodos.name,
    };
    const payload = {};
    const contraindicacion = await firstValueFrom(
      this.clienteMSContraindicacion.send(pattern, payload),
    ).catch((err) => manageErrors(this.msContraindicacion, err));
    return contraindicacion;
  }
}
