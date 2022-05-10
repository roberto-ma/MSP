import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { FrecuenciaService } from '../services/frecuencia.service';
import { ReadFrecuenciaDto } from '../dto/frecuencia.dto';

@ApiTags('Frecuencia')
@Controller('frecuencia')
export class FrecuenciaController {
  constructor(private readonly FrecuenciaService: FrecuenciaService) {}

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getFrecuenciaPorId(@Param('id') id: number) {
  //   const frecuencia = await this.FrecuenciaService.getFrecuenciaPorId(+id);
  //   return plainToClass(ReadFrecuenciaDto, frecuencia);
  // }

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('all')
  // async getFrecuenciaTodos() {
  //   const frecuencia = await this.FrecuenciaService.getFrecuenciaTodos();
  //   return plainToClass(ReadFrecuenciaDto, frecuencia);
  // }
}
