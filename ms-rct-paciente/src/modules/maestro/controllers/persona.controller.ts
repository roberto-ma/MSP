import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PersonaService } from '../services/persona.service';
import { ConstantesConfig } from '../../../config/constantes-config';

@Controller()
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @MessagePattern({
    role: ConstantesConfig.MS_RCT_PACIENTE,
    cmd: 'getPersonaPorIdentificacion',
  })
  async getPersonaPorIdentificacion(@Payload() identificacion: string) {
    return this.personaService.getPersonaPorIdentificacion(identificacion);
  }
}
