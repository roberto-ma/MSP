import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { ViaAdministracionService } from '../services/via-administracion.service';
import { ReadViaAdministracionDto } from '../dto/via-administracion.dto';

@ApiTags('ViaAdministracion')
@Controller('via-administracion')
export class ViaAdministracionController {
  // constructor(private readonly viaAdministracionService: ViaAdministracionService) { }
  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getViaAdministracionPorId(@Param('id') id: number) {
  //   const viaAdministracion = await this.viaAdministracionService.getViaAdministracionPorId(+id);
  //   return plainToClass(ReadViaAdministracionDto, viaAdministracion);
  // }
  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('all')
  // async getViaAdministracionTodos() {
  //   const viaAdministracion = await this.viaAdministracionService.getViaAdministracionTodos();
  //   return plainToClass(ReadViaAdministracionDto, viaAdministracion);
  // }
}
