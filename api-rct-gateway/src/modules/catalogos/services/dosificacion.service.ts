import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class DosificacionService {
  private readonly msDosificacion: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSDosificacion: ClientProxy,
  ) {
    this.msDosificacion = ConstantesConfig.MS_CATALOGO;
  }

  async getDosificacionPorId(id: number) {
    const pattern = {
      role: this.msDosificacion,
      cmd: this.getDosificacionPorId.name,
    };
    const payload = id;
    const dosificacion = await firstValueFrom(
      this.clienteMSDosificacion.send(pattern, payload),
    ).catch((err) => manageErrors(this.msDosificacion, err));

    return dosificacion;
  }
}
