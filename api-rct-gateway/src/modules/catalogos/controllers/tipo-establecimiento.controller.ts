import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { TipoEstablecimientoService } from '../services/tipo-establecimiento.service';
import { ReadTipoEstablecimientoDto } from '../dto/tipo-establecimiento.dto';

@ApiTags('TipoEstablecimiento')
@Controller('tipo-establecimiento')
export class TipoEstablecimientoController {
  // constructor(private readonly tipoEstablecimientoService: TipoEstablecimientoService) { }
  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getTipoEstablecimientoPorId(@Param('id') id: number) {
  //   const tipoEstablecimiento = await this.tipoEstablecimientoService.getTipoEstablecimientoPorId(+id);
  //   return plainToClass(ReadTipoEstablecimientoDto, tipoEstablecimiento);
  // }
}
