import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class FarmaciaService {
  private readonly msFarmacia: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSFarmacia: ClientProxy,
  ) {
    this.msFarmacia = ConstantesConfig.MS_CATALOGO;
  }

  async getFarmaciaPorId(id: number) {
    const pattern = {
      role: this.msFarmacia,
      cmd: this.getFarmaciaPorId.name,
    };
    const payload = id;
    const farmacia = await firstValueFrom(
      this.clienteMSFarmacia.send(pattern, payload),
    ).catch((err) => manageErrors(this.msFarmacia, err));

    return farmacia;
  }

  async getFarmaciaPorRuc(ruc: string) {
    const pattern = {
      role: this.msFarmacia,
      cmd: this.getFarmaciaPorRuc.name,
    };
    const payload = ruc;
    const farmacia = await firstValueFrom(
      this.clienteMSFarmacia.send(pattern, payload),
    ).catch((err) => manageErrors(this.msFarmacia, err));

    return farmacia;
  }
}
