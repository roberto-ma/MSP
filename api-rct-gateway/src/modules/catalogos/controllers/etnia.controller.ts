import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { EtniaService } from '../services/etnia.service';
import { ReadEtniaDto } from '../dto/etnia.dto';

@ApiTags('Etnia')
@Controller('etnia')
export class EtniaController {
  constructor(private readonly EtniaService: EtniaService) {}

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getEtniaPorId(@Param('id') id: number) {
  //   const etnia = await this.EtniaService.getEtniaPorId(+id);
  //   return plainToClass(ReadEtniaDto, etnia);
  // }

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('codigoPras/:codigoPras')
  // async getEtniaPorCodigoPras(@Param('codigoPras') codigoPras: string) {
  //   const etnia = await this.EtniaService.getEtniaPorCodigoPras(codigoPras);
  //   return plainToClass(ReadEtniaDto, etnia);
  // }

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('all')
  // async getEtniaTodos() {
  //   const etnia = await this.EtniaService.getEtniaTodos();
  //   return plainToClass(ReadEtniaDto, etnia);
  // }
}
