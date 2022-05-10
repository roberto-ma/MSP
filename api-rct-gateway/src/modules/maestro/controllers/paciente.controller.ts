import { Controller, Get, UseInterceptors, Post, Body } from '@nestjs/common';
import { Param, Version } from '@nestjs/common';
import { PacienteService } from '../services/paciente.service';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Roles } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { ReadPacienteDto, CreatePacienteDto } from '../dto/paciente.dto';
import { Constantes } from '../../../config/constantes';
import { InputDto } from '../../receta/dto/encrypt.dto';
import { EncryptInterceptor } from '../../../interceptors/encrypt.interceptor';

@ApiTags('Paciente')
@Controller('paciente')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Version(Constantes.API_V1)
  @ApiBearerAuth()
  @Roles({
    roles: [
      Constantes.KC_ROLE_ENTIDAD_SALUD,
      Constantes.KC_ROLE_CADENA_FARMACIA,
    ],
  })
  @Post()
  createPaciente(@Body() createPacienteDto: CreatePacienteDto) {
    const fechaNacimiento = createPacienteDto.persona.fecha_nacimiento;
    fechaNacimiento.setMinutes(
      fechaNacimiento.getMinutes() + fechaNacimiento.getTimezoneOffset(),
    );
    const paciente = this.pacienteService.createPaciente(createPacienteDto);
    return plainToClass(ReadPacienteDto, paciente);
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
  createPacienteEncrypted(@Body() createPacienteDto: CreatePacienteDto) {
    const fechaNacimiento = createPacienteDto.persona.fecha_nacimiento;
    fechaNacimiento.setMinutes(
      fechaNacimiento.getMinutes() + fechaNacimiento.getTimezoneOffset(),
    );
    const paciente = this.pacienteService.createPaciente(createPacienteDto);
    return plainToClass(ReadPacienteDto, paciente);
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
  async getPacientePorIdentificacion(
    @Param('identificacion') identificacion: string,
  ) {
    const paciente = await this.pacienteService.getPacientePorIdentificacion(
      identificacion,
    );
    return plainToClass(ReadPacienteDto, paciente);
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
  async getPacientePorIdentificacionEncrypt(
    @Param('identificacion') identificacion: string,
  ) {
    const paciente = await this.pacienteService.getPacientePorIdentificacion(
      identificacion,
    );
    return plainToClass(ReadPacienteDto, paciente);
  }
}
