import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class EspecialidadService {
  private readonly msEspecialidad: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSEspecialidad: ClientProxy,
  ) {
    this.msEspecialidad = ConstantesConfig.MS_CATALOGO;
  }

  async getEspecialidadPorId(id: number) {
    const pattern = {
      role: this.msEspecialidad,
      cmd: this.getEspecialidadPorId.name,
    };
    const payload = id;
    const especialidad = await firstValueFrom(
      this.clienteMSEspecialidad.send(pattern, payload),
    ).catch((err) => manageErrors(this.msEspecialidad, err));

    return especialidad;
  }
}
