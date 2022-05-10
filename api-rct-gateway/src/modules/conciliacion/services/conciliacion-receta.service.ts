/**
 * @ Author: Gustavo Panchi
 * @ Create Time: 2022-03-30 10:59:04
 * @ Modified by: Gustavo Panchi
 * @ Modified time: 2022-04-11 10:30:15
 * @ Description:
 */

import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Constantes } from '../../../config/constantes';
import { DispensacionService } from '../../receta/services/dispensacion.service';

import { ConstantesConfig } from '../../../config/constantes.config';
import { manageErrors } from '../../../helper/manageErrors';
import {
  ListaNovedades,
  ResponseConciliacion,
} from '../../../interfaces/respuesta-conciliacion.interface';
import {
  CreateConciliacionRecetaDto,
  UpdateConciliacionRecetaDto,
} from '../dto/conciliacion-receta.dto';
import { ConciliacionDetalleService } from './conciliacion-detalle.service';

@Injectable()
export class ConciliacionRecetaService {
  private readonly msRctConciliacion = ConstantesConfig.MS_RCT_CONCILIACION;
  constructor(
    @Inject(ConstantesConfig.MS_RCT_CONCILIACION)
    private readonly clienteMSConciliacion: ClientProxy,
    private readonly dispensacionService: DispensacionService,
    private readonly conciliacionDetalleService: ConciliacionDetalleService,
  ) {}

  async getConciliacionMspPorCodigoCuadre(codigoCuadre: string) {
    const pattern = {
      role: this.msRctConciliacion,
      cmd: this.getConciliacionMspPorCodigoCuadre.name,
    };
    const payload = codigoCuadre;
    const conciliacion = await firstValueFrom(
      this.clienteMSConciliacion.send(pattern, payload),
    ).catch((err) => manageErrors(this.msRctConciliacion, err));
    return conciliacion;
  }

  async createConciliacionReceta(
    createConciliacionRecetaDtos: CreateConciliacionRecetaDto[],
  ) {
    const pattern = {
      role: this.msRctConciliacion,
      cmd: this.createConciliacionReceta.name,
    };
    const payload = createConciliacionRecetaDtos;
    const conciliacion = await firstValueFrom(
      this.clienteMSConciliacion.send(pattern, payload),
    ).catch((err) => manageErrors(this.msRctConciliacion, err));
    return conciliacion;
  }

  async validarConciliacionDetalle(
    createConciliacionRecetaDtos: CreateConciliacionRecetaDto[],
  ) {
    let respuesta: ResponseConciliacion;
    const array_conciliacion_error: CreateConciliacionRecetaDto[] = [];
    const array_errores: ListaNovedades[] = [];
    const array_aciertos: ListaNovedades[] = [];

    for await (const itemDetalle of createConciliacionRecetaDtos) {
      const conciliacion = await this.getConciliacionMspPorCodigoCuadre(
        itemDetalle.codigoCuadre,
      );

      if (conciliacion.cuadra == Constantes.CT_CUADRA_CONCILIACION_SI) {
        array_aciertos.push({
          codigoCuadre: itemDetalle.codigoCuadre,
          fecha: null,
          mensaje: Constantes.CONCILIACION_EXITO.DETALLE,
          zona: conciliacion.zona,
        });
      } else {
        const dispensacion =
          await this.dispensacionService.getDispensacionPorOid(
            itemDetalle.codigoUnico,
          );
        if (!dispensacion) {
          array_errores.push({
            codigoCuadre: itemDetalle.codigoCuadre,
            fecha: null,
            mensaje: 'Código único no encontrado',
            zona: conciliacion.zona,
          });
        } else {
          let updateItemDetalle: UpdateConciliacionRecetaDto;
          const conciliacion_detalle =
            await this.conciliacionDetalleService.getConciliacionRecetaPorCodigoCuadre(
              itemDetalle.codigoCuadre,
            );

          for await (const detalle of conciliacion_detalle) {
            if (itemDetalle.codigoUnico == detalle.codigoUnico) {
              updateItemDetalle = {
                id: detalle.id,
                codigoUnico: itemDetalle.codigoUnico,
                codDispensacion: detalle.codDispensacion,
                codigoCuadre: itemDetalle.codigoCuadre,
                totalItems: itemDetalle.totalItems,
                valorOrden: itemDetalle.valorOrden,
              };
              break;
            }
          }

          // Agregando item a lista de conciliaciones con error para procesar
          array_conciliacion_error.push(
            updateItemDetalle ? updateItemDetalle : itemDetalle,
          );

          // valida si el valor coincide
          if (dispensacion.valor_total != itemDetalle.valorOrden) {
            array_errores.push({
              codigoCuadre: itemDetalle.codigoCuadre,
              fecha: dispensacion.fecha_dispensacion,
              mensaje: 'El valor total no coincide',
              zona: conciliacion.zona,
            });
          }

          // valida si la cantidad de items coincide
          if (dispensacion.cantidad_items !== itemDetalle.totalItems) {
            array_errores.push({
              codigoCuadre: itemDetalle.codigoCuadre,
              fecha: dispensacion.fecha_dispensacion,
              mensaje: 'La cantidad de items no coinciden',
              zona: conciliacion.zona,
            });
          }
        }
      }
    }

    for await (const acierto of array_aciertos) {
      array_errores.push(acierto);
    }

    // eslint-disable-next-line prefer-const
    respuesta = {
      codigo:
        array_errores.length == 0
          ? Constantes.CONCILIACION_EXITO.CODIGO
          : Constantes.CONCILIACION_ERROR.CODIGO,
      mensaje:
        array_errores.length == 0
          ? Constantes.CONCILIACION_EXITO.DETALLE
          : Constantes.CONCILIACION_ERROR.DETALLE,
      listaErrores: array_errores.length == 0 ? null : array_errores,
    };

    const procesadodetalle = await this.createConciliacionReceta(
      array_conciliacion_error,
    );
    if (!procesadodetalle) {
      throw new InternalServerErrorException(
        `${this.msRctConciliacion}: No se pudo procesar la conciliacion detalle`,
      );
    }
    return respuesta;
  }
}
