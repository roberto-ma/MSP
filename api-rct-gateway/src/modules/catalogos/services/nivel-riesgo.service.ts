import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class NivelRiesgoService {
  private readonly msNivelRiesgo: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSNivelRiesgo: ClientProxy,
  ) {
    this.msNivelRiesgo = ConstantesConfig.MS_CATALOGO;
  }

  async getNivelRiesgoPorId(id: number) {
    const pattern = {
      role: this.msNivelRiesgo,
      cmd: this.getNivelRiesgoPorId.name,
    };
    const payload = id;
    const nivelRiesgo = await firstValueFrom(
      this.clienteMSNivelRiesgo.send(pattern, payload),
    ).catch((err) => manageErrors(this.msNivelRiesgo, err));

    return nivelRiesgo;
  }

  async getNivelRiesgoTodos() {
    const pattern = {
      role: this.msNivelRiesgo,
      cmd: this.getNivelRiesgoTodos.name,
    };
    const payload = {};
    const nivelRiesgo = await firstValueFrom(
      this.clienteMSNivelRiesgo.send(pattern, payload),
    ).catch((err) => manageErrors(this.msNivelRiesgo, err));
    return nivelRiesgo;
  }
}
