import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { TipoLabAnalisisClinicoService } from '../services/tipo-lab-analisis-clinico.service';
import { ReadTipoLabAnalisisClinicoDto } from '../dto/tipo-lab-analisis-clinico.dto';

@ApiTags('TipoLabAnalisisClinico')
@Controller('tipo-lab-analisis-clinico')
export class TipoLabAnalisisClinicoController {
  constructor(
    private readonly tipoLabAnalisisClinicoService: TipoLabAnalisisClinicoService,
  ) {}

  // @Version('1')
  // ////@ApiBearerAuth()
  // @Unprotected()
  // @Get('id/:id')
  // async getTipoLabAnalisisClinicoPorId(@Param('id') id: number) {
  //   const tipoLabAnalisisClinico =
  //     await this.tipoLabAnalisisClinicoService.getTipoLabAnalisisClinicoPorId(
  //       +id,
  //     );
  //   return plainToClass(ReadTipoLabAnalisisClinicoDto, tipoLabAnalisisClinico);
  // }
}
