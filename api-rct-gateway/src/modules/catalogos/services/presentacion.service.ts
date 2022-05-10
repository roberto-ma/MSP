import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class PresentacionService {
  private readonly msPresentacion: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSPresentacion: ClientProxy,
  ) {
    this.msPresentacion = ConstantesConfig.MS_CATALOGO;
  }

  async getPresentacionPorId(id: number) {
    const pattern = {
      role: this.msPresentacion,
      cmd: this.getPresentacionPorId.name,
    };
    const payload = id;
    const presentacion = await firstValueFrom(
      this.clienteMSPresentacion.send(pattern, payload),
    ).catch((err) => manageErrors(this.msPresentacion, err));

    return presentacion;
  }
}
