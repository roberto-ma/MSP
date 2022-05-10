import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProfesionalSaludService } from '../services/profesional-salud.service';
import { CreateProfesionalSaludDto } from '../dto/profesional-salud.dto';
import { ConstantesConfig } from '../../../config/constantes-config';

@Controller()
export class ProfesionalSaludController {
  constructor(
    private readonly profesionalSaludService: ProfesionalSaludService,
  ) {}

  @MessagePattern({
    role: ConstantesConfig.MS_RCT_PACIENTE,
    cmd: 'createProfesionalSalud',
  })
  createProfesionalSalud(
    @Payload() createProfesionalSaludDto: CreateProfesionalSaludDto,
  ) {
    return this.profesionalSaludService.createProfesionalSalud(
      createProfesionalSaludDto,
    );
  }

  @MessagePattern({
    role: ConstantesConfig.MS_RCT_PACIENTE,
    cmd: 'getProfesionalSaludPorId',
  })
  getProfesionalSaludPorId(@Payload() id: number) {
    return this.profesionalSaludService.getProfesionalSaludPorId(id);
  }

  @MessagePattern({
    role: ConstantesConfig.MS_RCT_PACIENTE,
    cmd: 'getProfesionalSaludPorIdentificacion',
  })
  getProfesionalSaludPorIdentificacion(@Payload() identificacion: string) {
    return this.profesionalSaludService.getProfesionalSaludPorIdentificacion(
      identificacion,
    );
  }
}
