import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PacienteService } from '../services/paciente.service';
import { CreatePacienteDto } from '../dto/paciente.dto';
import { ConstantesConfig } from '../../../config/constantes-config';

@Controller()
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @MessagePattern({
    role: ConstantesConfig.MS_RCT_PACIENTE,
    cmd: 'createPaciente',
  })
  createPaciente(@Payload() createPacienteDto: CreatePacienteDto) {
    return this.pacienteService.createPaciente(createPacienteDto);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_RCT_PACIENTE,
    cmd: 'getPacientePorId',
  })
  getPacientePorId(@Payload() id: number) {
    return this.pacienteService.getPacientePorId(id);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_RCT_PACIENTE,
    cmd: 'getPacientePorIdentificacion',
  })
  getPacientePorIdentificacion(@Payload() identificacion: string) {
    return this.pacienteService.getPacientePorIdentificacion(identificacion);
  }
}
