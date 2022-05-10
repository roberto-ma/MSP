import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { MedExtService } from '../services/med-ext.service';
import { ReadMedExtDto } from '../dto/med-ext.dto';

@ApiTags('MedExt')
@Controller('med-ext')
export class MedExtController {
  constructor(private readonly medExtService: MedExtService) {}

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getMedExtPorId(@Param('id') id: number) {
  //   const medExt = await this.medExtService.getMedExtPorId(+id);
  //   return plainToClass(ReadMedExtDto, medExt);
  // }

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('cum/:cum')
  // async getMedExtsPorCum(@Param('cum') cum: string) {
  //   const MedExt = await this.medExtService.getMedExtsPorCum(cum);
  //   return plainToClass(ReadMedExtDto, MedExt);
  // }

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('act/:act')
  // async getMedExtsPorAct(@Param('act') act: string) {
  //   const MedExt = await this.medExtService.getMedExtsPorAct(act);
  //   return plainToClass(ReadMedExtDto, MedExt);
  // }
}
