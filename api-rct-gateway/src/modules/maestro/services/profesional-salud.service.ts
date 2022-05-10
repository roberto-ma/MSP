import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { ConstantesConfig } from '../../../config/constantes.config';
import { manageErrors } from '../../../helper/manageErrors';
import { CreateProfesionalSaludDto } from '../dto/profesional-salud.dto';

@Injectable()
export class ProfesionalSaludService {
  private readonly msPaciente = ConstantesConfig.MS_RCT_PACIENTE;
  constructor(
    @Inject(ConstantesConfig.MS_RCT_PACIENTE)
    private readonly clienteMSProfesionalSalud: ClientProxy,
  ) {}

  async createProfesionalSalud(
    createProfesionalSaludDto: CreateProfesionalSaludDto,
  ) {
    const pattern = {
      role: this.msPaciente,
      cmd: this.createProfesionalSalud.name,
    };
    const payload = createProfesionalSaludDto;
    const paciente = await firstValueFrom(
      this.clienteMSProfesionalSalud.send(pattern, payload),
    ).catch((err) => manageErrors(this.msPaciente, err));
    return paciente;
  }

  // async getProfesionalSaluds() {
  //   const pattern = {
  //     role: this.msPaciente,
  //     cmd: this.getProfesionalSaluds.name,
  //   };
  //   const payload = 1;
  //   const pacientes = await firstValueFrom(
  //     this.clienteMSProfesionalSalud.send(pattern, payload),
  //   ).catch((err) => manageErrors(this.msPaciente, err));
  //   return pacientes;
  // }

  async getProfesionalSaludPorId(id: number) {
    const pattern = {
      role: this.msPaciente,
      cmd: this.getProfesionalSaludPorId.name,
    };
    const payload = id;
    const profesionalSalud = await firstValueFrom(
      this.clienteMSProfesionalSalud.send(pattern, payload),
    ).catch((err) => manageErrors(this.msPaciente, err));

    return profesionalSalud;
  }

  async getProfesionalSaludPorIdentificacion(identificacion: string) {
    const pattern = {
      role: this.msPaciente,
      cmd: this.getProfesionalSaludPorIdentificacion.name,
    };
    const payload = identificacion;
    const profesionalSalud = await firstValueFrom(
      this.clienteMSProfesionalSalud.send(pattern, payload),
    ).catch((err) => manageErrors(this.msPaciente, err));

    return profesionalSalud;
  }

  // async updateProfesionalSalud(updatePersonaDto: UpdateProfesionalSaludDto) {
  //   const pattern = {
  //     role: this.msPaciente,
  //     cmd: this.updateProfesionalSalud.name,
  //   };
  //   const payload = updatePersonaDto;
  //   const paciente = await firstValueFrom(
  //     this.clienteMSProfesionalSalud.send(pattern, payload),
  //   ).catch((err) => manageErrors(this.msPaciente, err));
  //   return paciente;
  // }
}
