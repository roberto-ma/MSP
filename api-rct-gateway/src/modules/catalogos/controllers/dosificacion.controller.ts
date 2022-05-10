import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { DosificacionService } from '../services/dosificacion.service';
import { ReadDosificacionDto } from '../dto/dosificacion.dto';

@ApiTags('Dosificacion')
@Controller('dosificacion')
export class DosificacionController {
  constructor(private readonly dosificacionService: DosificacionService) {}

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getDosificacionPorId(@Param('id') id: number) {
  //   const dosificacion = await this.dosificacionService.getDosificacionPorId(
  //     +id,
  //   );
  //   return plainToClass(ReadDosificacionDto, dosificacion);
  // }
}
