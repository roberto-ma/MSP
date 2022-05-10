import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class ServicioSaludService {
  private readonly msServicioSalud: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSServicioSalud: ClientProxy,
  ) {
    this.msServicioSalud = ConstantesConfig.MS_CATALOGO;
  }

  async getServicioSaludPorId(id: number) {
    const pattern = {
      role: this.msServicioSalud,
      cmd: this.getServicioSaludPorId.name,
    };
    const payload = id;
    const servicioSalud = await firstValueFrom(
      this.clienteMSServicioSalud.send(pattern, payload),
    ).catch((err) => manageErrors(this.msServicioSalud, err));

    return servicioSalud;
  }
}
