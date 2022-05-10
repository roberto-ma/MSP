import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { ServicioSaludService } from '../services/servicio-salud.service';
import { ReadServicioSaludDto } from '../dto/servicio-salud.dto';

@ApiTags('ServicioSalud')
@Controller('servicio-salud')
export class ServicioSaludController {
  // constructor(private readonly servicioSaludService: ServicioSaludService) { }
  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getServicioSaludPorId(@Param('id') id: number) {
  //   const servicioSalud = await this.servicioSaludService.getServicioSaludPorId(+id);
  //   return plainToClass(ReadServicioSaludDto, servicioSalud);
  // }
}
