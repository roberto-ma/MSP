import { Injectable, Inject } from '@nestjs/common';
import { CreatePacienteDto } from '../dto/paciente.dto';
import { ConstantesConfig } from '../../../config/constantes.config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class PacienteService {
  private readonly msPaciente: string;
  constructor(
    @Inject(ConstantesConfig.MS_RCT_PACIENTE)
    private readonly clienteMSPaciente: ClientProxy,
  ) {
    this.msPaciente = ConstantesConfig.MS_RCT_PACIENTE;
  }

  async createPaciente(createPacienteDto: CreatePacienteDto) {
    const pattern = { role: this.msPaciente, cmd: this.createPaciente.name };
    const payload = createPacienteDto;
    const paciente = await firstValueFrom(
      this.clienteMSPaciente.send(pattern, payload),
    ).catch((err) => manageErrors(this.msPaciente, err));
    return paciente;
  }

  // async getPacientes() {
  //   const pattern = { role: this.msPaciente, cmd: this.getPacientes.name };
  //   const payload = 1;
  //   const pacientes = await firstValueFrom(
  //     this.clienteMSPaciente.send(pattern, payload),
  //   ).catch((err) => manageErrors(this.msPaciente, err));
  //   return pacientes;
  // }

  async getPacientePorId(id: number) {
    const pattern = { role: this.msPaciente, cmd: this.getPacientePorId.name };
    const payload = id;
    const paciente = await firstValueFrom(
      this.clienteMSPaciente.send(pattern, payload),
    ).catch((err) => manageErrors(this.msPaciente, err));

    return paciente;
  }

  async getPacientePorIdentificacion(identificacion: string) {
    const pattern = {
      role: this.msPaciente,
      cmd: this.getPacientePorIdentificacion.name,
    };
    const payload = identificacion;
    const paciente = await firstValueFrom(
      this.clienteMSPaciente.send(pattern, payload),
    ).catch((err) => manageErrors(this.msPaciente, err));
    return paciente;
  }

  // async updatePaciente(updatePersonaDto: UpdatePacienteDto) {
  //   const pattern = { role: this.msPaciente, cmd: this.updatePaciente.name };
  //   const payload = updatePersonaDto;
  //   const paciente = await firstValueFrom(
  //     this.clienteMSPaciente.send(pattern, payload),
  //   ).catch((err) => manageErrors(this.msPaciente, err));
  //   return paciente;
  // }
}
