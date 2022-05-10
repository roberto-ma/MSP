import { Injectable, Inject } from '@nestjs/common';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class ReligionService {
  private readonly msReligion: string;

  constructor(
    @Inject(ConstantesConfig.MS_CATALOGO)
    private readonly clienteMSReligion: ClientProxy,
  ) {
    this.msReligion = ConstantesConfig.MS_CATALOGO;
  }

  async getReligionPorId(id: number) {
    const pattern = {
      role: this.msReligion,
      cmd: this.getReligionPorId.name,
    };
    const payload = id;
    const religion = await firstValueFrom(
      this.clienteMSReligion.send(pattern, payload),
    ).catch((err) => manageErrors(this.msReligion, err));

    return religion;
  }

  async getReligionPorCodigoPras(codigoPras: string) {
    const pattern = {
      role: this.msReligion,
      cmd: this.getReligionPorCodigoPras.name,
    };
    const payload = codigoPras;
    const religion = await firstValueFrom(
      this.clienteMSReligion.send(pattern, payload),
    ).catch((err) => manageErrors(this.msReligion, err));

    return religion;
  }

  async getReligionTodos() {
    const pattern = {
      role: this.msReligion,
      cmd: this.getReligionTodos.name,
    };
    const payload = {};
    const religion = await firstValueFrom(
      this.clienteMSReligion.send(pattern, payload),
    ).catch((err) => manageErrors(this.msReligion, err));
    return religion;
  }
}
