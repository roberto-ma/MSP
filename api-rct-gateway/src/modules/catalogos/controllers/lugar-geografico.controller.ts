import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { LugarGeograficoService } from '../services/lugar-geografico.service';
import { ReadLugarGeograficoDto } from '../dto/lugar-geografico.dto';

@ApiTags('LugarGeografico')
@Controller('lugar-geografico')
export class LugarGeograficoController {
  // constructor(private readonly lugarGeograficoService: LugarGeograficoService) { }
  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getLugarGeograficoPorId(@Param('id') id: number) {
  //   const LugarGeografico = await this.lugarGeograficoService.getLugarGeograficoPorId(+id);
  //   return plainToClass(ReadLugarGeograficoDto, LugarGeografico);
  // }
  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('codigoPras/:codigoPras')
  // async getLugarGeograficoPorCodigoPras(@Param('codigoPras') codigoPras: string) {
  //   const LugarGeografico = await this.lugarGeograficoService.getLugarGeograficoPorCodigoPras(codigoPras);
  //   return plainToClass(ReadLugarGeograficoDto, LugarGeografico);
  // }
}
