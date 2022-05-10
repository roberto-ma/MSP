import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { ContraindicacionService } from '../services/contraindicacion.service';
import { ReadContraindicacionDto } from '../dto/contraindicacion.dto';

@ApiTags('Contraindicacion')
@Controller('contraindicacion')
export class ContraindicacionController {
  constructor(
    private readonly contraindicacionService: ContraindicacionService,
  ) {}

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getContraindicacionPorId(@Param('id') id: number) {
  //   const contraindicacion =
  //     await this.contraindicacionService.getContraindicacionPorId(+id);
  //   return plainToClass(ReadContraindicacionDto, contraindicacion);
  // }
}
