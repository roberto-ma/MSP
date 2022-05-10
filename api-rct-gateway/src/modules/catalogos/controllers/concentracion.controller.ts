import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { ConcentracionService } from '../services/concentracion.service';
import { ReadConcentracionDto } from '../dto/concentracion.dto';

@ApiTags('Concentracion')
@Controller('concentracion')
export class ConcentracionController {
  constructor(private readonly concentracionService: ConcentracionService) {}

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getConcentracionPorId(@Param('id') id: number) {
  //   const concentracion = await this.concentracionService.getConcentracionPorId(
  //     +id,
  //   );
  //   return plainToClass(ReadConcentracionDto, concentracion);
  // }

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('all')
  // async getConcentracionTodos() {
  //   const concentracion =
  //     await this.concentracionService.getConcentracionTodos();
  //   return plainToClass(ReadConcentracionDto, concentracion);
  // }
}
