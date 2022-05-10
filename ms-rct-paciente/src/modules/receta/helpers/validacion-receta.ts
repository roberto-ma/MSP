import { RpcException } from '@nestjs/microservices';
import { Constantes } from '../../../config/constantes';
import { Receta } from '../entities/receta.entity';
import { HttpStatus } from '@nestjs/common';

export class ValidacionReceta {
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
}
