import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { FuenteDatosService } from '../services/fuente-datos.service';
import { ReadFuenteDatosDto } from '../dto/fuente-datos.dto';

@ApiTags('FuenteDatos')
@Controller('fuente-datos')
export class FuenteDatosController {
  constructor(private readonly FuenteDatosService: FuenteDatosService) {}

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getFuenteDatosPorId(@Param('id') id: number) {
  //   const fuenteDatos = await this.FuenteDatosService.getFuenteDatosPorId(+id);
  //   return plainToClass(ReadFuenteDatosDto, fuenteDatos);
  // }

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('all')
  // async getFuenteDatosTodos() {
  //   const fuenteDatos = await this.FuenteDatosService.getFuenteDatosTodos();
  //   return plainToClass(ReadFuenteDatosDto, fuenteDatos);
  // }
}
