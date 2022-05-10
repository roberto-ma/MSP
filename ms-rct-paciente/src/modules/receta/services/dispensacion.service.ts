import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateDispensacionDto } from '../dto/dispensacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { DispensacionRepository } from '../repositories/dispensacion.repository';
import { RecetaService } from './receta.service';
import { Constantes } from '../../../config/constantes';
import { Connection } from 'typeorm';
import { Receta } from '../entities/receta.entity';
import { Dispensacion } from '../entities/dispensacion.entity';
import { ConstantesConfig } from '../../../config/constantes-config';

@Injectable()
export class DispensacionService {
  constructor(
    @InjectRepository(DispensacionRepository)
    private readonly dispensacionRepository: DispensacionRepository,
    private readonly recetaService: RecetaService,
    private readonly connection: Connection,
  ) {}

  async createDispensacion(createDispensacionDto: CreateDispensacionDto) {
    const receta = await this.recetaService.getRecetaPorOidParaValidacion(
      createDispensacionDto.receta_oid,
    );
    this.verificacionesParaGuardar(createDispensacionDto, receta);
    //this.verificarCodigoAutorizacion(createDispensacionDto, receta);
    delete createDispensacionDto.codigo_autorizacion;
    let dispensacion = this.dispensacionRepository.create(
      createDispensacionDto,
    );
    dispensacion = this.verificarPrecioTotal(dispensacion, receta);

    return await this.transaccionDispensacionConEstadoReceta(
      receta,
      dispensacion,
    );
  }

  async transaccionDispensacionConEstadoReceta(
    receta: Receta,
    dispensacion: Dispensacion,
  ) {
    return await this.connection
      .transaction(async (manager) => {
        receta.estado_receta_id = Constantes.ESTADO_RECETA_DISPENSADO;
        await manager.save(receta);
        return await manager.save(dispensacion);
      })
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      });
  }

  verificacionesParaGuardar(
    createDispensacionDto: CreateDispensacionDto,
    receta: Receta,
  ) {
    this.verificarCodigoAutorizacion(createDispensacionDto, receta);
    this.verificarFechaDispensacion(
      createDispensacionDto.fecha_dispensacion,
      receta.bloqueo_tiempo,
    );
  }

  verificarFechaDispensacion(fechaDispensacion: Date, fechaBloqueo: Date) {
    const fechaBloqueoInicio = new Date(fechaBloqueo);
    fechaBloqueoInicio.setMinutes(
      fechaBloqueoInicio.getMinutes() - Constantes.BLOQUEO_TIEMPO,
    );

    if (
      fechaDispensacion.getTime() < fechaBloqueoInicio.getTime() ||
      fechaDispensacion.getTime() > fechaBloqueo.getTime()
    ) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message:
          Constantes.ERROR_CODIGO_FECHA_DISPENSACIÓN +
          fechaBloqueoInicio +
          ' - ' +
          fechaBloqueo,
      });
    }
  }

  verificarCodigoAutorizacion(
    createDispensacionDto: CreateDispensacionDto,
    receta: Receta,
  ) {
    this.recetaService.verificarEstadoReceta(receta);
    const ahora = new Date();
    if (receta.codigo_autorizacion != createDispensacionDto.codigo_autorizacion)
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: Constantes.ERROR_CODIGO_AUTORIZACION,
      });

    if (receta.codigo_autorizacion_tiempo.getTime() < ahora.getTime())
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: Constantes.ERROR_CODIGO_AUTORIZACION_TIEMPO,
      });
  }

  verificarPrecioTotal(dispensacion: Dispensacion, receta: Receta) {
    let valorTotalReceta = 0;
    let contItems = 0;
    Promise.all(
      receta.recetaDetalle.map((detalle) => {
        const subtotal = detalle.cantidad_prescrita * detalle.precio_farmacia;
        valorTotalReceta += subtotal;
        contItems++;
      }),
    );
    const totalTrunc = valorTotalReceta.toFixed(6);
    const valorTotaltrunc = dispensacion.valor_total.toFixed(6);

    if (valorTotaltrunc != totalTrunc) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Valor total de la receta ${totalTrunc} difiere con el de la dispensacion ${dispensacion.valor_total.toFixed(
          6,
        )}`,
      });
    }
    dispensacion.cantidad_items = contItems;
    return dispensacion;
  }

  async getDispensacionPorRecetaOid(recetaOid: string) {
    const dispensacion = await this.dispensacionRepository
      .getDispensacionPorOidER(recetaOid)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      });

    if (!dispensacion)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Dispensación de receta '${recetaOid}' no encontrada`,
      });
    return dispensacion;
  }

  async getDispensacionPorOidConReceta(recetaOid: string) {
    const dispensacion = await this.dispensacionRepository
      .getDispensacionPorOidConRecetaER(recetaOid)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      });

    if (!dispensacion)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Dispensación de receta '${recetaOid}' no encontrada`,
      });
    return dispensacion;
  }
}
