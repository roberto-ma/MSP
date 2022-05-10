import { BadRequestException, Injectable } from '@nestjs/common';
import { NestInterceptor } from '@nestjs/common';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { FuenteDatosService } from '../modules/catalogos/services/fuente-datos.service';
import { CadenaFarmaciaService } from '../modules/catalogos/services/cadena-farmacia.service';
import { AES, enc } from 'crypto-ts';
import { Constantes } from '../config/constantes';

@Injectable()
export class EncryptInterceptor implements NestInterceptor {
  constructor(
    private readonly fuenteDatosService: FuenteDatosService,
    private readonly cadenaFarmaciaService: CadenaFarmaciaService,
  ) {}
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const usuarioKeycloak = request?.user;
    let fuentedatos = usuarioKeycloak?.fuente_datos;
    let cadenafarmacia = usuarioKeycloak?.cadena_farmacia;
    let key: string;
    if (!usuarioKeycloak) {
      fuentedatos = request.params?.fuentedatos;
      cadenafarmacia = request.params?.cadenafarmacia;
    }
    if (!fuentedatos && !cadenafarmacia) {
      fuentedatos = request.body?.fuentedatos;
      cadenafarmacia = request.body?.cadenafarmacia;
    }
    if (!fuentedatos && !cadenafarmacia) {
      throw new BadRequestException(
        `No se encontró fuente de datos o cadena farmacia`,
      );
    }

    /*Consulta llaves de fuente de datos*/
    if (fuentedatos) {
      const fuenteDatos = await this.fuenteDatosService.getFuenteDatosPorId(
        fuentedatos,
      );
      key = fuenteDatos.llaveCriptografia;
    }
    /*Consulta llaves de cadena farmacia*/
    if (cadenafarmacia) {
      const cadenaFarmacia =
        await this.cadenaFarmaciaService.getCadenaFarmaciaPorId(cadenafarmacia);
      key = cadenaFarmacia.llaveCriptografia;
    }

    /*Verifica si el método es post para desencriptar el DTO*/
    if (request.method == Constantes.METHOD_POST) {
      try {
        request.body = JSON.parse(
          AES.decrypt(request.body.data, key).toString(enc.Utf8),
        );
      } catch (error) {
        throw new BadRequestException(`Error en el proceso de desencriptación`);
      }
    }

    return next.handle().pipe(
      map(async (data) => {
        let encrypted: string;
        try {
          encrypted = AES.encrypt(JSON.stringify(data), key).toString();
        } catch (error) {
          throw new BadRequestException(`Error en el proceso de encriptación`);
        }
        return { data: encrypted };
      }),
    );
  }
}
