import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class TarifarioService {
  private readonly msTarifario: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSTarifario: ClientProxy,
  ) {
    this.msTarifario = ConstantesConfig.MS_CATALOGO;
  }

  async getTarifarioPorProductId(productoId: number) {
    const pattern = {
      role: this.msTarifario,
      cmd: this.getTarifarioPorProductId.name,
    };
    const payload = productoId;
    const tarifario = await firstValueFrom(
      this.clienteMSTarifario.send(pattern, payload),
    ).catch((err) => manageErrors(this.msTarifario, err));

    return tarifario;
  }
}
