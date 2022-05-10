import { BadRequestException, CallHandler } from '@nestjs/common';
import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { RespuestaKeycloak } from '../interfaces';
import { CadenaFarmaciaService } from '../modules/catalogos/services/cadena-farmacia.service';
import { FuenteDatosService } from '../modules/catalogos/services/fuente-datos.service';

@Injectable()
export class DispensacionInterceptor implements NestInterceptor {
  constructor(
    private readonly fuenteDatosService: FuenteDatosService,
    private readonly cadenaFarmaciaService: CadenaFarmaciaService,
  ) {}
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const usuarioKeycloak = request?.user as RespuestaKeycloak;
    const fuentedatos = usuarioKeycloak?.fuente_datos;
    //const cadenafarmacia = usuarioKeycloak?.cadena_farmacia;
    const oid = request.params?.oid as string;
    if (!fuentedatos) {
      throw new BadRequestException(
        `No se encontró fuente de datos en el Access Token.`,
      );
    }

    const arrOid = oid.split('.');
    if (arrOid?.length != 3) {
      throw new BadRequestException(`Formato de OID incorrecto`);
    }

    const fuentedatosReceta = parseInt(arrOid[1]);

    if (!fuentedatos.startsWith(fuentedatosReceta + '')) {
      throw new BadRequestException(
        `El OID de la receta indica que se a emitido por el establecimiento de salud '${fuentedatosReceta}'`,
      );
    }

    const restoString = parseInt(
      fuentedatos.replace(fuentedatosReceta + '', ''),
    );

    if (restoString != 0) {
      throw new BadRequestException(
        `El OID de la receta indica que se a emitido por el establecimiento de salud '${fuentedatosReceta}'`,
      );
    }

    return next.handle();
  }
}
