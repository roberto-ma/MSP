import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class DosisMedidaService {
  private readonly msDosisMedida: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSDosisMedida: ClientProxy,
  ) {
    this.msDosisMedida = ConstantesConfig.MS_CATALOGO;
  }

  async getDosisMedidaPorId(id: number) {
    const pattern = {
      role: this.msDosisMedida,
      cmd: this.getDosisMedidaPorId.name,
    };
    const payload = id;
    const DosisMedida = await firstValueFrom(
      this.clienteMSDosisMedida.send(pattern, payload),
    ).catch((err) => manageErrors(this.msDosisMedida, err));

    return DosisMedida;
  }

  async getDosisMedidaTodos() {
    const pattern = {
      role: this.msDosisMedida,
      cmd: this.getDosisMedidaTodos.name,
    };
    const payload = {};
    const dosisMedida = await firstValueFrom(
      this.clienteMSDosisMedida.send(pattern, payload),
    ).catch((err) => manageErrors(this.msDosisMedida, err));

    return dosisMedida;
  }
}
