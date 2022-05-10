import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class EstadoService {
  private readonly msEstado: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSEstado: ClientProxy,
  ) {
    this.msEstado = ConstantesConfig.MS_CATALOGO;
  }

  async getEstadoPorId(id: number) {
    const pattern = {
      role: this.msEstado,
      cmd: this.getEstadoPorId.name,
    };
    const payload = id;
    const estado = await firstValueFrom(
      this.clienteMSEstado.send(pattern, payload),
    ).catch((err) => manageErrors(this.msEstado, err));

    return estado;
  }

  async getEstadoTodos() {
    const pattern = {
      role: this.msEstado,
      cmd: this.getEstadoTodos.name,
    };
    const payload = {};
    const estado = await firstValueFrom(
      this.clienteMSEstado.send(pattern, payload),
    ).catch((err) => manageErrors(this.msEstado, err));
    return estado;
  }
}
