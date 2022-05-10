import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { InteraccionesService } from '../services/interacciones.service';
import { ReadInteraccionesDto } from '../dto/interacciones.dto';

@ApiTags('Interacciones')
@Controller('interacciones')
export class InteraccionesController {
  // constructor(private readonly InteraccionesService: InteraccionesService) { }
  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getInteraccionesPorId(@Param('id') id: number) {
  //   const Interacciones = await this.InteraccionesService.getInteraccionesPorId(+id);
  //   return plainToClass(ReadInteraccionesDto, Interacciones);
  // }
}
