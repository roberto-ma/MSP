import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class LugarGeograficoService {
  private readonly msLugarGeografico: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSLugarGeografico: ClientProxy,
  ) {
    this.msLugarGeografico = ConstantesConfig.MS_CATALOGO;
  }

  async getLugarGeograficoPorId(id: number) {
    const pattern = {
      role: this.msLugarGeografico,
      cmd: this.getLugarGeograficoPorId.name,
    };
    const payload = id;
    const lugarGeografico = await firstValueFrom(
      this.clienteMSLugarGeografico.send(pattern, payload),
    ).catch((err) => manageErrors(this.msLugarGeografico, err));

    return lugarGeografico;
  }

  async getLugarGeograficoPorCodigoPras(codigoPras: string) {
    const pattern = {
      role: this.msLugarGeografico,
      cmd: this.getLugarGeograficoPorCodigoPras.name,
    };
    const payload = codigoPras;
    const lugarGeografico = await firstValueFrom(
      this.clienteMSLugarGeografico.send(pattern, payload),
    ).catch((err) => manageErrors(this.msLugarGeografico, err));

    return lugarGeografico;
  }
}
