import { Injectable, Inject } from '@nestjs/common';
import { CreateDispensacionDto } from '../dto/dispensacion.dto';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class DispensacionService {
  private readonly msDispensacion: string;
  constructor(
    @Inject(ConstantesConfig.MS_RCT_PACIENTE)
    private readonly clienteMSPaciente: ClientProxy,
  ) {
    this.msDispensacion = ConstantesConfig.MS_RCT_PACIENTE;
  }

  async createDispensacion(createDispensacionDto: CreateDispensacionDto) {
    const pattern = {
      role: this.msDispensacion,
      cmd: this.createDispensacion.name,
    };
    const payload = createDispensacionDto;
    const dispensacion = await firstValueFrom(
      this.clienteMSPaciente.send(pattern, payload),
    ).catch((err) => manageErrors(this.msDispensacion, err));
    return dispensacion;
  }

  // async getDispensacions() {
  //   const pattern = {
  //     role: this.msDispensacion,
  //     cmd: this.getDispensacions.name,
  //   };
  //   const payload = 1;
  //   const dispensacions = await firstValueFrom(
  //     this.clienteMSPaciente.send(pattern, payload),
  //   ).catch((err) => manageErrors(this.msDispensacion, err));
  //   return dispensacions;
  // }

  async getDispensacionPorOid(oid: string) {
    const pattern = {
      role: this.msDispensacion,
      cmd: this.getDispensacionPorOid.name,
    };
    const payload = oid;
    const dispensacion = await firstValueFrom(
      this.clienteMSPaciente.send(pattern, payload),
    ).catch(() => {
      return null;
    });

    return dispensacion;
  }

  async getDispensacionPorOidConReceta(oid: string) {
    const pattern = {
      role: this.msDispensacion,
      cmd: this.getDispensacionPorOidConReceta.name,
    };
    const payload = oid;
    const dispensacion = await firstValueFrom(
      this.clienteMSPaciente.send(pattern, payload),
    ).catch((err) => manageErrors(this.msDispensacion, err));
    return dispensacion;
  }

  // async updateDispensacion(updatePersonaDto: UpdateDispensacionDto) {
  //   const pattern = {
  //     role: this.msDispensacion,
  //     cmd: this.updateDispensacion.name,
  //   };
  //   const payload = updatePersonaDto;
  //   const dispensacion = await firstValueFrom(
  //     this.clienteMSPaciente.send(pattern, payload),
  //   ).catch((err) => manageErrors(this.msDispensacion, err));
  //   return dispensacion;
  // }
}
