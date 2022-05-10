import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class FuenteDatosService {
  private readonly msFuenteDatos = ConstantesConfig.MS_CATALOGO;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSFuenteDatos: ClientProxy,
  ) {}

  async getFuenteDatosPorId(id: number) {
    const pattern = {
      role: this.msFuenteDatos,
      cmd: this.getFuenteDatosPorId.name,
    };
    const payload = id;

    const fuenteDatos = await firstValueFrom(
      this.clienteMSFuenteDatos.send(pattern, payload),
    ).catch((err) => manageErrors(this.msFuenteDatos, err));

    return fuenteDatos;
  }

  async getFuenteDatosPorIdOrNull(id: number) {
    const pattern = {
      role: this.msFuenteDatos,
      cmd: this.getFuenteDatosPorId.name,
    };
    const payload = id;

    const fuenteDatos = await firstValueFrom(
      this.clienteMSFuenteDatos.send(pattern, payload),
    ).catch((err) => {
      return null;
    });

    return fuenteDatos;
  }

  async getFuenteDatosTodos() {
    const pattern = {
      role: this.msFuenteDatos,
      cmd: this.getFuenteDatosTodos.name,
    };
    const payload = {};
    const fuenteDatos = await firstValueFrom(
      this.clienteMSFuenteDatos.send(pattern, payload),
    ).catch((err) => manageErrors(this.msFuenteDatos, err));
    return fuenteDatos;
  }
}
