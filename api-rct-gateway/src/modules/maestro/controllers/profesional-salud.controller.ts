import { Version, UseInterceptors } from '@nestjs/common';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Roles } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';

import { ProfesionalSaludService } from '../services/profesional-salud.service';
import { ReadProfesionalSaludDto } from '../dto/profesional-salud.dto';
import { CreateProfesionalSaludDto } from '../dto/profesional-salud.dto';
import { Constantes } from '../../../config/constantes';
import { Post, Body } from '@nestjs/common';
import { InputDto } from '../../receta/dto/encrypt.dto';
import { EncryptInterceptor } from '../../../interceptors/encrypt.interceptor';

@ApiTags('ProfesionalSalud')
@Controller('profesional-salud')
export class ProfesionalSaludController {
  constructor(
    private readonly profesionalSaludService: ProfesionalSaludService,
  ) {}

  @Version(Constantes.API_V1)
  @ApiBearerAuth()
  @Roles({
    roles: [
      Constantes.KC_ROLE_ENTIDAD_SALUD,
      Constantes.KC_ROLE_CADENA_FARMACIA,
    ],
  })
  @Post()
  createProfesionalSalud(
    @Body() createProfesionalSaludDto: CreateProfesionalSaludDto,
  ) {
    const fechaNacimiento = createProfesionalSaludDto.persona.fecha_nacimiento;
    fechaNacimiento.setMinutes(
      fechaNacimiento.getMinutes() + fechaNacimiento.getTimezoneOffset(),
    );
    const profesionalSalud =
      this.profesionalSaludService.createProfesionalSalud(
        createProfesionalSaludDto,
      );
    return plainToClass(ReadProfesionalSaludDto, profesionalSalud);
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
  @ApiBody({
    type: InputDto,
    required: true,
    isArray: false,
  })
  @Post()
  createProfesionalSaludEncrypted(
    @Body() createProfesionalSaludDto: CreateProfesionalSaludDto,
  ) {
    const fechaNacimiento = createProfesionalSaludDto.persona.fecha_nacimiento;
    fechaNacimiento.setMinutes(
      fechaNacimiento.getMinutes() + fechaNacimiento.getTimezoneOffset(),
    );
    const profesionalSalud =
      this.profesionalSaludService.createProfesionalSalud(
        createProfesionalSaludDto,
      );
    return plainToClass(ReadProfesionalSaludDto, profesionalSalud);
  }

  @Version(Constantes.API_V1)
  @ApiBearerAuth()
  @Roles({
    roles: [
      Constantes.KC_ROLE_ENTIDAD_SALUD,
      Constantes.KC_ROLE_CADENA_FARMACIA,
    ],
  })
  @Get(':identificacion')
  async getProfesionalSaludPorIdentificacion(
    @Param('identificacion') identificacion: string,
  ) {
    const profesionalSalud =
      await this.profesionalSaludService.getProfesionalSaludPorIdentificacion(
        identificacion,
      );
    return plainToClass(ReadProfesionalSaludDto, profesionalSalud);
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
  async getProfesionalSaludPorIdentificacionEncrypt(
    @Param('identificacion') identificacion: string,
  ) {
    const profesionalSalud =
      await this.profesionalSaludService.getProfesionalSaludPorIdentificacion(
        identificacion,
      );
    return plainToClass(ReadProfesionalSaludDto, profesionalSalud);
  }
}
