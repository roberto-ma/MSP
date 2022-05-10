import { Post, UseInterceptors, Version } from '@nestjs/common';

import { Body, Controller, ParseArrayPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Roles } from 'nest-keycloak-connect';

import { Constantes } from '../../../config/constantes';
import { InputDto } from '../../receta/dto/encrypt.dto';
import { CreateConciliacionRecetaDto } from '../dto/conciliacion-receta.dto';
import { ConciliacionRecetaService } from '../services/conciliacion-receta.service';
import { EncryptInterceptor } from '../../../interceptors/encrypt.interceptor';

@ApiTags('Conciliacion Detalle')
@Controller('detalle')
export class ConciliacionRecetaController {
  constructor(
    private readonly conciliacionRecetaService: ConciliacionRecetaService,
  ) {}

  @Version(Constantes.API_V1)
  @ApiBearerAuth()
  @Roles({
    roles: [
      Constantes.KC_ROLE_ENTIDAD_SALUD,
      Constantes.KC_ROLE_CADENA_FARMACIA,
    ],
  })
  @Post('guardar_detalle')
  @ApiBody({
    type: CreateConciliacionRecetaDto,
    description: 'ConciliacionRecetaDto',
    required: true,
    isArray: true,
  })
  async createConciliacionDetalle(
    @Body(new ParseArrayPipe({ items: CreateConciliacionRecetaDto }))
    createConciliacionRecetaDtos: CreateConciliacionRecetaDto[],
  ) {
    return this.conciliacionRecetaService.validarConciliacionDetalle(
      createConciliacionRecetaDtos,
    );
  }

  @Version(Constantes.API_V2)
  @UseInterceptors(EncryptInterceptor)
  @ApiBearerAuth()
  @Roles({
    roles: [
      Constantes.KC_ROLE_ENTIDAD_SALUD,
      Constantes.KC_ROLE_CADENA_FARMACIA,
    ],
  })
  @Post('guardar_detalle')
  @ApiBody({
    type: InputDto,
    required: true,
    isArray: false,
  })
  async createConciliacionDetalleEncrypt(
    @Body(new ParseArrayPipe({ items: CreateConciliacionRecetaDto }))
    createConciliacionRecetaDtos: CreateConciliacionRecetaDto[],
  ) {
    return this.conciliacionRecetaService.validarConciliacionDetalle(
      createConciliacionRecetaDtos,
    );
  }
}
