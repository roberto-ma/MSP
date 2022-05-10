import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class InstitucionService {
  private readonly msInstitucion: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSInstitucion: ClientProxy,
  ) {
    this.msInstitucion = ConstantesConfig.MS_CATALOGO;
  }

  async getInstitucionPorId(id: number) {
    const pattern = {
      role: this.msInstitucion,
      cmd: this.getInstitucionPorId.name,
    };
    const payload = id;
    const institucion = await firstValueFrom(
      this.clienteMSInstitucion.send(pattern, payload),
    ).catch((err) => manageErrors(this.msInstitucion, err));

    return institucion;
  }
}
