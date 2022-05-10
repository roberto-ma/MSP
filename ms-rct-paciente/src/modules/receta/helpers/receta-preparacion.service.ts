import { Injectable, HttpStatus } from '@nestjs/common';
import { Receta } from '../entities/receta.entity';
import { Constantes } from '../../../config/constantes';
import { randomInt } from 'crypto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class RecetaPreparacionService {
  async prepararCodigoAutorizacion(receta: Receta) {
    const tiempoAutorizacion = new Date();
    tiempoAutorizacion.setSeconds(
      tiempoAutorizacion.getSeconds() + Constantes.CODIGO_AUTORIZACION_TIEMPO,
    );
    const codigoAutorizacion = randomInt(100000, 999999);

    receta.codigo_autorizacion_tiempo = tiempoAutorizacion;
    receta.codigo_autorizacion = codigoAutorizacion;
    return receta;
  }

  async prepararTiempoBloqueo(receta: Receta, validacionFarmaciaId: number) {
    const ahora = new Date();
    if (
      receta.bloqueo_tiempo?.getTime() < ahora.getTime() ||
      receta.bloqueo_tiempo == null
    ) {
      const tiempoBloqueo = ahora;
      ahora.setMinutes(ahora.getMinutes() + Constantes.BLOQUEO_TIEMPO);
      receta.bloqueo_farmacia_id = validacionFarmaciaId;
      receta.bloqueo_tiempo = tiempoBloqueo;
      return receta;
    }
    return receta;
  }

  async verificarEstadoReceta(receta: Receta) {
    if (receta.estado_receta_id == Constantes.ESTADO_RECETA_PREESCRITO)
      return receta;

    if (receta.estado_receta_id == Constantes.ESTADO_RECETA_DISPENSADO)
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Receta ${receta.oid} se encuentra Dispensada`,
      });
    if (receta.estado_receta_id == Constantes.ESTADO_RECETA_CADUCADO)
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Receta ${receta.oid} se encuentra Caducada`,
      });

    if (receta.estado_receta_id == Constantes.ESTADO_RECETA_RECHAZADO)
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Receta ${receta.oid} se encuentra Rechazada`,
      });

    if (receta.estado_receta_id == Constantes.ESTADO_RECETA_ANULADO_ORIGEN)
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Receta ${receta.oid} se encuentra Anulada desde origen`,
      });

    if (receta.estado_receta_id == Constantes.ESTADO_RECETA_ANULADO_DISP)
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Receta ${receta.oid} se encuentra Anulada desde dispensaión`,
      });
    return receta;
  }

  async verificarBloqueoRecetaParaBusquedas(receta: Receta) {
    const ahora = new Date();
    if (receta.bloqueo_tiempo?.getTime() > ahora.getTime()) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Receta ${receta.oid} se encuentra en proceso de dispensación. Inténtelo nuevamente más tarde`,
      });
    }
    return receta;
  }

  async verificarBloqueoRecetaParaValidacionPrecios(
    receta: Receta,
    validacionFarmaciaID: number,
  ) {
    const ahora = new Date();
    if (
      receta.bloqueo_tiempo?.getTime() > ahora.getTime() &&
      validacionFarmaciaID != receta.bloqueo_farmacia_id
    ) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Receta ${receta.oid} se encuentra en proceso de dispensación. Inténtelo nuevamente más tarde`,
      });
    }
    return receta;
  }
}
