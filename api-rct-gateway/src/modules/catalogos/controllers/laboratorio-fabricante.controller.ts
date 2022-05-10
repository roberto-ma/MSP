import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { LaboratorioFabricanteService } from '../services/laboratorio-fabricante.service';
import { ReadLaboratorioFabricanteDto } from '../dto/laboratorio-fabricante.dto';

@ApiTags('LaboratorioFabricante')
@Controller('laboratorio-fabricante')
export class LaboratorioFabricanteController {
  constructor(
    private readonly laboratorioFabricanteService: LaboratorioFabricanteService,
  ) {}

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getLaboratorioFabricantePorId(@Param('id') id: number) {
  //   const laboratorioFabricante = await this.laboratorioFabricanteService.getLaboratorioFabricantePorId(+id);
  //   return plainToClass(ReadLaboratorioFabricanteDto, laboratorioFabricante);
  // }
}
