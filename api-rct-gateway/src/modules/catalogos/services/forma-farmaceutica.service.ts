import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class FormaFarmaceuticaService {
  private readonly msFormaFarmaceutica: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSFormaFarmaceutica: ClientProxy,
  ) {
    this.msFormaFarmaceutica = ConstantesConfig.MS_CATALOGO;
  }

  async getFormaFarmaceuticaPorId(id: number) {
    const pattern = {
      role: this.msFormaFarmaceutica,
      cmd: this.getFormaFarmaceuticaPorId.name,
    };
    const payload = id;
    const formaFarmaceutica = await firstValueFrom(
      this.clienteMSFormaFarmaceutica.send(pattern, payload),
    ).catch((err) => manageErrors(this.msFormaFarmaceutica, err));

    return formaFarmaceutica;
  }

  async getFormaFarmaceuticaTodos() {
    const pattern = {
      role: this.msFormaFarmaceutica,
      cmd: this.getFormaFarmaceuticaTodos.name,
    };
    const payload = {};
    const formaFarmaceutica = await firstValueFrom(
      this.clienteMSFormaFarmaceutica.send(pattern, payload),
    ).catch((err) => manageErrors(this.msFormaFarmaceutica, err));
    return formaFarmaceutica;
  }
}
