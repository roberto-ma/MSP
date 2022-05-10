import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class EstablecimientoService {
  private readonly msEstablecimiento: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSEstablecimiento: ClientProxy,
  ) {
    this.msEstablecimiento = ConstantesConfig.MS_CATALOGO;
  }

  async getEstablecimientoPorId(id: number) {
    const pattern = {
      role: this.msEstablecimiento,
      cmd: this.getEstablecimientoPorId.name,
    };
    const payload = id;
    const establecimiento = await firstValueFrom(
      this.clienteMSEstablecimiento.send(pattern, payload),
    ).catch((err) => manageErrors(this.msEstablecimiento, err));

    return establecimiento;
  }

  async getEstablecimientoPorUniCodigo(unicodigo: string) {
    const pattern = {
      role: this.msEstablecimiento,
      cmd: this.getEstablecimientoPorUniCodigo.name,
    };
    const payload = unicodigo;
    const establecimiento = await firstValueFrom(
      this.clienteMSEstablecimiento.send(pattern, payload),
    ).catch((err) => manageErrors(this.msEstablecimiento, err));

    return establecimiento;
  }

  async getEstablecimientoPorRuc(ruc: string) {
    const pattern = {
      role: this.msEstablecimiento,
      cmd: this.getEstablecimientoPorRuc.name,
    };
    const payload = ruc;
    const establecimiento = await firstValueFrom(
      this.clienteMSEstablecimiento.send(pattern, payload),
    ).catch((err) => manageErrors(this.msEstablecimiento, err));

    return establecimiento;
  }
}
