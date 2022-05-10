import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class ViaAdministracionService {
  private readonly msViaAdministracion: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSViaAdministracion: ClientProxy,
  ) {
    this.msViaAdministracion = ConstantesConfig.MS_CATALOGO;
  }

  async getViaAdministracionPorId(id: number) {
    const pattern = {
      role: this.msViaAdministracion,
      cmd: this.getViaAdministracionPorId.name,
    };
    const payload = id;
    const viaAdministracion = await firstValueFrom(
      this.clienteMSViaAdministracion.send(pattern, payload),
    ).catch((err) => manageErrors(this.msViaAdministracion, err));

    return viaAdministracion;
  }

  async getViaAdministracionTodos() {
    const pattern = {
      role: this.msViaAdministracion,
      cmd: this.getViaAdministracionTodos.name,
    };
    const payload = {};
    const viaAdministracion = await firstValueFrom(
      this.clienteMSViaAdministracion.send(pattern, payload),
    ).catch((err) => manageErrors(this.msViaAdministracion, err));
    return viaAdministracion;
  }
}
