import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { ObservacionService } from '../services/observacion.service';
import { ReadObservacionDto } from '../dto/observacion.dto';

@ApiTags('Observacion')
@Controller('observacion')
export class ObservacionController {
  constructor(private readonly observacionService: ObservacionService) {}

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getObservacionPorId(@Param('id') id: number) {
  //   const observacion = await this.observacionService.getObservacionPorId(+id);
  //   return plainToClass(ReadObservacionDto, observacion);
  // }
}
