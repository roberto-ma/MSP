import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { EstablecimientoService } from '../services/establecimiento.service';
import { ReadEstablecimientoDto } from '../dto/establecimiento.dto';

@ApiTags('Establecimiento')
@Controller('establecimiento')
export class EstablecimientoController {
  constructor(
    private readonly establecimientoService: EstablecimientoService,
  ) {}

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getEstablecimientoPorId(@Param('id') id: number) {
  //   const establecimiento = await this.establecimientoService.getEstablecimientoPorId(+id);
  //   return plainToClass(ReadEstablecimientoDto, establecimiento);
  // }

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('unicodigo/:unicodigo')
  // async getEstablecimientoPorUniCodigo(@Param('unicodigo') unicodigo: string) {
  //   const establecimiento = await this.establecimientoService.getEstablecimientoPorUniCodigo(unicodigo);
  //   return plainToClass(ReadEstablecimientoDto, establecimiento);
  // }

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('ruc/:ruc')
  // async getEstablecimientoPorRuc(@Param('ruc') ruc: string) {
  //   const establecimiento = await this.establecimientoService.getEstablecimientoPorRuc(ruc);
  //   return plainToClass(ReadEstablecimientoDto, establecimiento);
  // }
}
