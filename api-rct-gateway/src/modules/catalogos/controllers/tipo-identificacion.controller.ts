import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { TipoIdentificacionService } from '../services/tipo-identificacion.service';
import { ReadTipoIdentificacionDto } from '../dto/tipo-identificacion.dto';

@ApiTags('TipoIdentificacion')
@Controller('tipo-identificacion')
export class TipoIdentificacionController {
  // constructor(private readonly tipoIdentificacionService: TipoIdentificacionService) { }
  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getTipoIdentificacionPorId(@Param('id') id: number) {
  //   const tipoIdentificacion = await this.tipoIdentificacionService.getTipoIdentificacionPorId(+id);
  //   return plainToClass(ReadTipoIdentificacionDto, tipoIdentificacion);
  // }
  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('all')
  // async getTipoIdentificacionTodos() {
  //   const tipoIdentificacion = await this.tipoIdentificacionService.getTipoIdentificacionTodos();
  //   return plainToClass(ReadTipoIdentificacionDto, tipoIdentificacion);
  // }
}
