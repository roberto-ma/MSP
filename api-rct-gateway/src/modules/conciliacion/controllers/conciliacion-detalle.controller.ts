import { Version, UseInterceptors } from '@nestjs/common';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'nest-keycloak-connect';

import { ConciliacionDetalleService } from '../services/conciliacion-detalle.service';
import { Constantes } from '../../../config/constantes';
import { EncryptInterceptor } from '../../../interceptors/encrypt.interceptor';

@ApiTags('Conciliacion Detalle')
@Controller('consulta')
export class ConciliacionDetalleController {
  constructor(
    private readonly conciliacionDetalleService: ConciliacionDetalleService,
  ) {}

  @Version(Constantes.API_V1)
  @ApiBearerAuth()
  @Roles({
    roles: [
      Constantes.KC_ROLE_ENTIDAD_SALUD,
      Constantes.KC_ROLE_CADENA_FARMACIA,
    ],
  })
  @Get('detalle/:codigoCuadre')
  async getFacturaDetalleConciliacion(
    @Param('codigoCuadre') codigoCuadre: string,
  ) {
    return this.conciliacionDetalleService.getFacturaDetalleConciliacion(
      codigoCuadre,
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
  @Get('detalle/:codigoCuadre')
  async getFacturaDetalleConciliacionEncrypt(
    @Param('codigoCuadre') codigoCuadre: string,
  ) {
    return this.conciliacionDetalleService.getFacturaDetalleConciliacion(
      codigoCuadre,
    );
  }
}
