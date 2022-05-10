import { ExceptionFilter, Catch, Logger, HttpStatus } from '@nestjs/common';
import { ArgumentsHost, HttpException } from '@nestjs/common';

import { Request, Response } from 'express';
import { FuenteDatosService } from '../modules/catalogos/services/fuente-datos.service';
import { CadenaFarmaciaService } from '../modules/catalogos/services/cadena-farmacia.service';
import { AES } from 'crypto-ts';
import { Constantes } from '../config/constantes';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly fuenteDatosService: FuenteDatosService,
    private readonly cadenaFarmaciaService: CadenaFarmaciaService,
  ) {}
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>() as any;
    const status = exception.getStatus();
    const responseMessage = exception.getResponse() as any;
    const mensajeLog = responseMessage?.error
      ? responseMessage.error + ': '
      : '';

    const url = request.url as string;

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

    /*Consulta llaves de fuente de datos*/
    if (fuentedatos) {
      const fuenteDatos =
        await this.fuenteDatosService.getFuenteDatosPorIdOrNull(fuentedatos);
      key = fuenteDatos?.llaveCriptografia;
    }
    /*Consulta llaves de cadena farmacia*/
    if (cadenafarmacia) {
      const cadenaFarmacia =
        await this.cadenaFarmaciaService.getCadenaFarmaciaPorIdOrNull(
          cadenafarmacia,
        );
      key = cadenaFarmacia?.llaveCriptografia;
    }

    //Filtro para NO registrar en consola Error 404
    if (status != HttpStatus.NOT_FOUND && responseMessage?.message)
      Logger.error(mensajeLog + responseMessage?.message, status + '');

    //Filtro para verificar si el mensaje de error es de TOO_MANY_REQUESTS (no cuenta con responseMessage.message)
    if (status == HttpStatus.TOO_MANY_REQUESTS)
      Logger.warn(mensajeLog + responseMessage, status + '');

    const error = {
      error: responseMessage,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    if (key && url.startsWith('/' + Constantes.VERSION_API_ENCRYPT)) {
      response.status(status).json({
        error: AES.encrypt(JSON.stringify(error), key).toString(),
      });
    } else {
      response.status(status).json({
        error: responseMessage,
        path: request.url,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
