import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { NivelRiesgoService } from '../services/nivel-riesgo.service';
import { ReadNivelRiesgoDto } from '../dto/nivel-riesgo.dto';

@ApiTags('NivelRiesgo')
@Controller('nivel-riesgo')
export class NivelRiesgoController {
  constructor(private readonly nivelRiesgoService: NivelRiesgoService) {}

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getNivelRiesgoPorId(@Param('id') id: number) {
  //   const nivelRiesgo = await this.nivelRiesgoService.getNivelRiesgoPorId(+id);
  //   return plainToClass(ReadNivelRiesgoDto, nivelRiesgo);
  // }

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('all')
  // async getNivelRiesgoTodos() {
  //   const nivelRiesgo = await this.nivelRiesgoService.getNivelRiesgoTodos();
  //   return plainToClass(ReadNivelRiesgoDto, nivelRiesgo);
  // }
}
