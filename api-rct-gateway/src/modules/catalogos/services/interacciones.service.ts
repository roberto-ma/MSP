import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class InteraccionesService {
  private readonly msInteracciones: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSInteracciones: ClientProxy,
  ) {
    this.msInteracciones = ConstantesConfig.MS_CATALOGO;
  }

  async getInteraccionesPorId(id: number) {
    const pattern = {
      role: this.msInteracciones,
      cmd: this.getInteraccionesPorId.name,
    };
    const payload = id;
    const interacciones = await firstValueFrom(
      this.clienteMSInteracciones.send(pattern, payload),
    ).catch((err) => manageErrors(this.msInteracciones, err));

    return interacciones;
  }
}
