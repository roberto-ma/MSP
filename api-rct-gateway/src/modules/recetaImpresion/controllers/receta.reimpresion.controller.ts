import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Version } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Scopes, Unprotected } from 'nest-keycloak-connect';
import { plainToClass } from 'class-transformer';
import { RespuestaKeycloak } from '../../../interfaces/respuesta-keycloak.interface';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { RecetaReImpresionService } from '../services/receta.reimpresion.service';
//import { ReadrecetaReImpresionDto } from '../dto/receta.reimpresion.dto';

@ApiTags('RecetaReimpresion')
@Controller('receta')
export class RecetaReImpController {
  constructor(
    private readonly recetaReImpresionService: RecetaReImpresionService,
  ) {}

  @Version('1')
  ////@ApiBearerAuth()
  @Unprotected()
  @Get('Identificador/:Identificador')
  async getRecetaActivaTodos(@Param('Identificador') Ident: number) {
    const recetaRImp = await this.recetaReImpresionService.getRecetaActivaTodos(
      Ident,
    );
    // return plainToClass(ReadrecetaReImpresionDto, recetaRImp, {
    //   excludeExtraneousValues: true,
    // });
    return recetaRImp;
  }
}
