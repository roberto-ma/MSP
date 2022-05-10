import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { IndicacionesCnmbService } from '../services/indicaciones-cnmb.service';
import { ReadIndicacionesCnmbDto } from '../dto/indicaciones-cnmb.dto';

@ApiTags('IndicacionesCnmb')
@Controller('indicaciones-cnmb')
export class IndicacionesCnmbController {
  constructor(
    private readonly indicacionesCnmbService: IndicacionesCnmbService,
  ) {}

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getIndicacionesCnmbPorId(@Param('id') id: number) {
  //   const IndicacionesCnmb = await this.indicacionesCnmbService.getIndicacionesCnmbPorId(+id);
  //   return plainToClass(ReadIndicacionesCnmbDto, IndicacionesCnmb);
  // }
}
