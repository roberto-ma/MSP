import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { TipoAtencionService } from '../services/tipo-atencion.service';
import { ReadTipoAtencionDto } from '../dto/tipo-atencion.dto';

@ApiTags('TipoAtencion')
@Controller('tipo-atencion')
export class TipoAtencionController {
  constructor(private readonly TipoAtencionService: TipoAtencionService) {}

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getTipoAtencionPorId(@Param('id') id: number) {
  //   const tipoAtencion = await this.TipoAtencionService.getTipoAtencionPorId(+id);
  //   return plainToClass(ReadTipoAtencionDto, tipoAtencion);
  // }

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('all')
  // async getTipoAtencionTodos() {
  //   const tipoAtencion = await this.TipoAtencionService.getTipoAtencionTodos();
  //   return plainToClass(ReadTipoAtencionDto, tipoAtencion);
  // }
}
