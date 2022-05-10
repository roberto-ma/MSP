import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { EspecialidadService } from '../services/especialidad.service';
import { ReadEspecialidadDto } from '../dto/especialidad.dto';

@ApiTags('Especialidad')
@Controller('especialidad')
export class EspecialidadController {
  constructor(private readonly especialidadService: EspecialidadService) {}

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getEspecialidadPorId(@Param('id') id: number) {
  //   const Especialidad = await this.especialidadService.getEspecialidadPorId(+id);
  //   return plainToClass(ReadEspecialidadDto, Especialidad);
  // }
}
