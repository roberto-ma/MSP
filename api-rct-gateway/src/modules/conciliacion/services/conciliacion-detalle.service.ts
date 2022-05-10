/**
 * @ Author: Gustavo Panchi
 * @ Create Time: 2022-03-30 14:47:31
 * @ Modified by: Gustavo Panchi
 * @ Modified time: 2022-04-11 10:33:22
 * @ Description:
 */

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Constantes } from '../../../config/constantes';
import { DispensacionService } from '../../receta/services/dispensacion.service';
import { RecetaService } from '../../receta/services/receta.service';

import { ConstantesConfig } from '../../../config/constantes.config';
import { manageErrors } from '../../../helper/manageErrors';

@Injectable()
export class ConciliacionDetalleService {
  private readonly msRctConciliacion = ConstantesConfig.MS_RCT_CONCILIACION;
  constructor(
    @Inject(ConstantesConfig.MS_RCT_CONCILIACION)
    private readonly clienteMSConciliacion: ClientProxy,
    private readonly recetaService: RecetaService,
    private readonly dispensacionService: DispensacionService,
  ) {}

  async getConciliacionRecetaPorCodigoCuadre(codigoCuadre: string) {
    const pattern = {
      role: this.msRctConciliacion,
      cmd: this.getConciliacionRecetaPorCodigoCuadre.name,
    };
    const payload = codigoCuadre;
    const conciliacion = await firstValueFrom(
      this.clienteMSConciliacion.send(pattern, payload),
    ).catch((err) => {
      manageErrors(this.msRctConciliacion, err);
    });
    return conciliacion;
  }

  async getFacturaDetalleConciliacion(codigoCuadre: string) {
    const lista_detalle = await this.getConciliacionRecetaPorCodigoCuadre(
      codigoCuadre,
    );
    const array_respuesta: any[] = [];
    for await (const item of lista_detalle) {
      if (item.cuadra == Constantes.CT_CUADRA_CONCILIACION.NO) {
        const receta = await this.recetaService.getRecetaPorOidParaConciliacion(
          item.codigoUnico,
        );

        const dispensacion =
          await this.dispensacionService.getDispensacionPorOid(
            item.codigoUnico,
          );

        const array_detalle = [];
        for await (const detalle of receta.recetaDetalle) {
          array_detalle.push({
            idMedicamento: detalle.id,
            cantidad: detalle.cantidad_prescrita,
            valorUnitarioItem: parseFloat(detalle.precio_farmacia.toFixed(4)),
            valorTotalItem: parseFloat(
              (detalle.cantidad_prescrita * detalle.precio_farmacia).toFixed(4),
            ),
          });
        }

        const res_receta = {
          codCuadre: codigoCuadre,
          fechaOrden: receta.fecha_receta,
          codZona: receta.organico.codigoZona,
          codUnico: receta.oid,
          codDispensacion: dispensacion.numero_orden,
          valTotalReceta: dispensacion.valor_total,
          cantidadTotalReceta: dispensacion.cantidad_items,
          medicamentos: array_detalle,
        };

        array_respuesta.push(res_receta);
      }
    }

    if (array_respuesta.length == 0) {
      throw new NotFoundException(
        'No existen facturas a conciliar asociadas al código de cuadre',
      );
    }
    return array_respuesta;
  }
}
