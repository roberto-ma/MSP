import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { FormaFarmaceuticaService } from '../services/forma-farmaceutica.service';
import { ReadFormaFarmaceuticaDto } from '../dto/forma-farmaceutica.dto';

@ApiTags('FormaFarmaceutica')
@Controller('forma-farmaceutica')
export class FormaFarmaceuticaController {
  constructor(
    private readonly formaFarmaceuticaService: FormaFarmaceuticaService,
  ) {}

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getFormaFarmaceuticaPorId(@Param('id') id: number) {
  //   const formaFarmaceutica = await this.formaFarmaceuticaService.getFormaFarmaceuticaPorId(+id);
  //   return plainToClass(ReadFormaFarmaceuticaDto, formaFarmaceutica);
  // }

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('all')
  // async getFormaFarmaceuticaTodos() {
  //   const formaFarmaceutica = await this.formaFarmaceuticaService.getFormaFarmaceuticaTodos();
  //   return plainToClass(ReadFormaFarmaceuticaDto, formaFarmaceutica);
  // }
}
