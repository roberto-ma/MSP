import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class NivelPrescripcionService {
  private readonly msNivelPrescripcion: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSNivelPrescripcion: ClientProxy,
  ) {
    this.msNivelPrescripcion = ConstantesConfig.MS_CATALOGO;
  }

  async getNivelPrescripcionPorId(id: number) {
    const pattern = {
      role: this.msNivelPrescripcion,
      cmd: this.getNivelPrescripcionPorId.name,
    };
    const payload = id;
    const nivelPrescripcion = await firstValueFrom(
      this.clienteMSNivelPrescripcion.send(pattern, payload),
    ).catch((err) => manageErrors(this.msNivelPrescripcion, err));

    return nivelPrescripcion;
  }

  async getNivelPrescripcionTodos() {
    const pattern = {
      role: this.msNivelPrescripcion,
      cmd: this.getNivelPrescripcionTodos.name,
    };
    const payload = {};
    const nivelPrescripcion = await firstValueFrom(
      this.clienteMSNivelPrescripcion.send(pattern, payload),
    ).catch((err) => manageErrors(this.msNivelPrescripcion, err));
    return nivelPrescripcion;
  }
}
