import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { NivelPrescripcionService } from '../services/nivel-prescripcion.service';
import { ReadNivelPrescripcionDto } from '../dto/nivel-prescripcion.dto';

@ApiTags('NivelPrescripcion')
@Controller('nivel-prescripcion')
export class NivelPrescripcionController {
  constructor(
    private readonly nivelPrescripcionService: NivelPrescripcionService,
  ) {}

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getNivelPrescripcionPorId(@Param('id') id: number) {
  //   const nivelPrescripcion = await this.nivelPrescripcionService.getNivelPrescripcionPorId(+id);
  //   return plainToClass(ReadNivelPrescripcionDto, nivelPrescripcion);
  // }

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('all')
  // async getNivelPrescripcionTodos() {
  //   const nivelPrescripcion = await this.nivelPrescripcionService.getNivelPrescripcionTodos();
  //   return plainToClass(ReadNivelPrescripcionDto, nivelPrescripcion);
  // }
}
