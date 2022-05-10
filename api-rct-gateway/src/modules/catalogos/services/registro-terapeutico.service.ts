import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class RegistroTerapeuticoService {
  private readonly msRegistroTerapeutico: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSRegistroTerapeutico: ClientProxy,
  ) {
    this.msRegistroTerapeutico = ConstantesConfig.MS_CATALOGO;
  }

  async getRegistroTerapeuticoPorId(id: number) {
    const pattern = {
      role: this.msRegistroTerapeutico,
      cmd: this.getRegistroTerapeuticoPorId.name,
    };
    const payload = id;
    const registroTerapeutico = await firstValueFrom(
      this.clienteMSRegistroTerapeutico.send(pattern, payload),
    ).catch((err) => manageErrors(this.msRegistroTerapeutico, err));

    return registroTerapeutico;
  }
}
