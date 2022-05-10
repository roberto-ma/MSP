import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { OrganicoService } from '../services/organico.service';
import { ReadOrganicoDto } from '../dto/organico.dto';

@ApiTags('Organico')
@Controller('organico')
export class OrganicoController {
  constructor(private readonly organicoService: OrganicoService) {}

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getOrganicoPorId(@Param('id') id: number) {
  //   const organico = await this.organicoService.getOrganicoPorId(+id);
  //   return plainToClass(ReadOrganicoDto, organico);
  // }

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('codigoCircuito/:codigoCircuito')
  // async getOrganicoPorCodigoCircuito(@Param('codigoCircuito') codigoCircuito: string) {
  //   const organico = await this.organicoService.getOrganicoPorCodigoCircuito(codigoCircuito);
  //   return plainToClass(ReadOrganicoDto, organico);
  // }
}
