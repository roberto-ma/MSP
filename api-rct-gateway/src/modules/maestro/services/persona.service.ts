import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConstantesConfig } from '../../../config/constantes.config';
import { firstValueFrom } from 'rxjs';
import { manageErrors } from '../../../helper/manageErrors';
import { CreatePersonaDto } from '../dto/persona.dto';

@Injectable()
export class PersonaService {
  private readonly msPaciente: string;
  constructor(
    @Inject(ConstantesConfig.MS_RCT_PACIENTE)
    private readonly clienteMSPaciente: ClientProxy,
  ) {
    this.msPaciente = ConstantesConfig.MS_RCT_PACIENTE;
  }

  async createPersona(createPersonaDto: CreatePersonaDto) {
    const pattern = { role: this.msPaciente, cmd: this.createPersona.name };
    const payload = createPersonaDto;
    const persona = await firstValueFrom(
      this.clienteMSPaciente.send(pattern, payload),
    ).catch((err) => manageErrors(this.msPaciente, err));
    return persona;
  }

  // async getPersonas() {
  //   const pattern = { role: this.msPaciente, cmd: this.getPersonas.name };
  //   const payload = 1;
  //   const personas = await firstValueFrom(
  //     this.clienteMSPaciente.send(pattern, payload),
  //   ).catch((err) => manageErrors(this.msPaciente, err));
  //   return personas;
  // }

  async getPersonaPorId(id: number) {
    const pattern = { role: this.msPaciente, cmd: this.getPersonaPorId.name };
    const payload = id;
    const persona = await firstValueFrom(
      this.clienteMSPaciente.send(pattern, payload),
    ).catch((err) => manageErrors(this.msPaciente, err));
    return persona;
  }

  async getPersonaPorIdentificacion(identificacion: string) {
    const pattern = {
      role: this.msPaciente,
      cmd: this.getPersonaPorIdentificacion.name,
    };
    const payload = identificacion;
    const persona = await firstValueFrom(
      this.clienteMSPaciente.send(pattern, payload),
    ).catch((err) => manageErrors(this.msPaciente, err));
    return persona;
  }

  // async updatePersona(
  //   updatePersonaDto: UpdatePersonaDto,
  //   usernameUsuarioAutenticado: string,
  // ) {
  //   const pattern = { role: this.msPaciente, cmd: this.updatePersona.name };
  //   const payload = { updatePersonaDto, usernameUsuarioAutenticado };
  //   const persona = await firstValueFrom(
  //     this.clienteMSPaciente.send(pattern, payload),
  //   ).catch((err) => manageErrors(this.msPaciente, err));
  //   return persona;
  // }
}
