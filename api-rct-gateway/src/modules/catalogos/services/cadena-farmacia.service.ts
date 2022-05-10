import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class CadenaFarmaciaService {
  private readonly msCadenaFarmacia = ConstantesConfig.MS_CATALOGO;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSCadenaFarmacia: ClientProxy,
  ) {}

  async getCadenaFarmaciaPorId(id: number) {
    const pattern = {
      role: this.msCadenaFarmacia,
      cmd: this.getCadenaFarmaciaPorId.name,
    };

    const payload = id;
    const cadenaFarmacia = await firstValueFrom(
      this.clienteMSCadenaFarmacia.send(pattern, payload),
    ).catch((err) => manageErrors(this.msCadenaFarmacia, err));

    return cadenaFarmacia;
  }

  async getCadenaFarmaciaPorIdOrNull(id: number) {
    const pattern = {
      role: this.msCadenaFarmacia,
      cmd: this.getCadenaFarmaciaPorId.name,
    };

    const payload = id;
    const cadenaFarmacia = await firstValueFrom(
      this.clienteMSCadenaFarmacia.send(pattern, payload),
    ).catch((err) => {
      return null;
    });

    return cadenaFarmacia;
  }
}
