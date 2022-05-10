import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { FarmaciaService } from '../services/farmacia.service';
import { ReadFarmaciaDto } from '../dto/farmacia.dto';

@ApiTags('Farmacia')
@Controller('farmacia')
export class FarmaciaController {
  constructor(private readonly FarmaciaService: FarmaciaService) {}

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getFarmaciaPorId(@Param('id') id: number) {
  //   const farmacia = await this.FarmaciaService.getFarmaciaPorId(+id);
  //   return plainToClass(ReadFarmaciaDto, farmacia);
  // }

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('ruc/:ruc')
  // async getFarmaciaPorRuc(@Param('ruc') ruc: string) {
  //   const farmacia = await this.FarmaciaService.getFarmaciaPorRuc(ruc);
  //   return plainToClass(ReadFarmaciaDto, farmacia);
  // }
}
