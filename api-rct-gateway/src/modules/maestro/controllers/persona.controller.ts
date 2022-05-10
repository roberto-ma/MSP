import {
  Controller,
  Get,
  Param,
  Version,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';

import { PersonaService } from '../services/persona.service';
import { ReadPersonaDto } from '../dto/persona.dto';
import { Constantes } from '../../../config/constantes';
import { EncryptInterceptor } from '../../../interceptors/encrypt.interceptor';

@ApiTags('Persona')
@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Version(Constantes.API_V1)
  @ApiBearerAuth()
  @Roles({
    roles: [
      Constantes.KC_ROLE_ENTIDAD_SALUD,
      Constantes.KC_ROLE_CADENA_FARMACIA,
    ],
  })
  @Get(':identificacion')
  async getPersonaPorIdentificacion(
    @Param('identificacion') identificacion: string,
  ) {
    const persona = await this.personaService.getPersonaPorIdentificacion(
      identificacion,
    );
    return plainToClass(ReadPersonaDto, persona);
  }

  @Version(Constantes.API_V2)
  @UseInterceptors(EncryptInterceptor)
  @ApiBearerAuth()
  @Roles({
    roles: [
      Constantes.KC_ROLE_ENTIDAD_SALUD,
      Constantes.KC_ROLE_CADENA_FARMACIA,
    ],
  })
  @Get(':identificacion')
  async getPersonaPorIdentificacionEncrypt(
    @Param('identificacion') identificacion: string,
  ) {
    const persona = await this.personaService.getPersonaPorIdentificacion(
      identificacion,
    );
    return plainToClass(ReadPersonaDto, persona);
  }
}
