import { HttpStatus, Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { CreateRecetaDto, UpdateAnulacionRecetaDto } from '../dto/receta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { RecetaRepository } from '../repositories/receta.repository';
import { EstablecimientoService } from '../../catalogos/services/establecimiento.service';
import { PersonaService } from '../../maestro/services/persona.service';
import { PacienteService } from '../../maestro/services/paciente.service';
import { ProfesionalSaludService } from '../../maestro/services/profesional-salud.service';
import { Receta } from '../entities/receta.entity';
import { Connection } from 'typeorm';
import { TarifarioService } from '../../catalogos/services/tarifario.service';
import { Constantes } from '../../../config/constantes';
import { ValidateRecetaDto } from '../dto/receta-validacion.dto';
import { RecetaDetalleService } from './receta-detalle.service';
import { ProfesionalSalud } from '../../maestro/entities/profesional-salud.entity';
import { MedicamentoService } from '../../catalogos/services/medicamento.service';

@Injectable()
export class RecetaService {
  constructor(
    @InjectRepository(RecetaRepository)
    private readonly recetaRepository: RecetaRepository,
    private readonly establecimientoService: EstablecimientoService,
    private readonly personaService: PersonaService,
    private readonly pacienteService: PacienteService,
    private readonly profesionalSaludService: ProfesionalSaludService,
    private readonly tarifarioService: TarifarioService,
    private readonly medicamentoService: MedicamentoService,
    private readonly recetaDetalleService: RecetaDetalleService,
    private readonly connection: Connection,
  ) {}

  /***Inicio*** Proceso de creación de receta*/
  async createReceta(createRecetaDto) {
    // eslint-disable-next-line prefer-const
    const { receta, prescriptor } = await this.prepararReceta(createRecetaDto);
    const recetaLista = await this.prepararDetalleReceta(receta, prescriptor);
    return await this.transaccionRecetaConDetalle(recetaLista);
  }

  async transaccionRecetaConDetalle(receta: Receta) {
    return await this.connection
      .transaction(async (manager) => {
        const recetaGuardada = await manager.save(receta);
        await Promise.all(
          receta.recetaDetalle.map(async (detalle) => {
            detalle.receta_id = recetaGuardada.id;
            await manager.save(detalle);
          }),
        );

        return recetaGuardada;
      })
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      });
  }

  async prepararReceta(createRecetaDto: CreateRecetaDto) {
    const fechaReceta = createRecetaDto.fecha_receta;
    const fechaCaducidad = createRecetaDto.fecha_caducidad;
    const fechaValidacion = createRecetaDto.fecha_validacion;

    this.verificarFechaReceta(fechaReceta, fechaCaducidad, fechaValidacion);

    const establecimiento =
      await this.establecimientoService.getEstablecimientoPorId(
        createRecetaDto.establecimiento_id,
      );
    const paciente = await this.pacienteService.getPacientePorIdentificacion(
      createRecetaDto.paciente.persona.identificacion,
    );
    const personaPrescriptor =
      await this.personaService.getPersonaPorIdentificacion(
        createRecetaDto.prescriptor.persona.identificacion,
      );
    const prescriptor =
      await this.profesionalSaludService.getProfesionalSaludValido(
        createRecetaDto.establecimiento_id,
        personaPrescriptor.id,
        createRecetaDto.prescriptor.psicotropico,
        createRecetaDto.prescriptor.codigo_acess,
      );

    delete createRecetaDto.paciente;
    let receta = this.recetaRepository.create(createRecetaDto);
    receta.estado_receta_id = Constantes.ESTADO_RECETA_PREESCRITO;
    receta.establecimiento_id = establecimiento.id;
    receta.organico_id = establecimiento.organico_id;
    receta.lugar_geografico_id = establecimiento.lugar_geografico_id;
    receta.paciente_id = paciente.persona_id;
    receta.prescriptor_id = prescriptor.persona_id;

    receta = await this.prepararValidadorReceta(createRecetaDto, receta);

    return { receta, prescriptor };
  }

  async prepararDetalleReceta(receta: Receta, prescriptor: ProfesionalSalud) {
    const mensajeError: string[] = [];

    const recetaDetalle = await Promise.all(
      receta.recetaDetalle.map(async (recetaDetalle) => {
        const tarifario = await this.tarifarioService.getTarifarioPorProductId(
          recetaDetalle.medicamento_id,
        );
        if (prescriptor.psicotropico == Constantes.CT_PS_NO_PSICOTROPICOS) {
          const medicamento = await this.medicamentoService.getMedicamentoPorId(
            recetaDetalle.medicamento_id,
          );
          if (
            medicamento.psicotropicoEstupefaciente !=
            Constantes.CT_MED_NO_PSICOTROPICOS
          ) {
            mensajeError.push(
              ` Med. ${recetaDetalle.medicamento_id}: es psicotrópico. Verifique los permisos para recetar del Profesional de Salud`,
            );
          }
        }
        recetaDetalle.tarifario_id = tarifario.id;
        recetaDetalle.precio_tarifario = tarifario.precioUnitario;
        return recetaDetalle;
      }),
    );

    if (mensajeError.length != 0) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: mensajeError.join(';'),
      });
    }
    receta.recetaDetalle = recetaDetalle;

    return receta;
  }

  /***Fin*** Proceso de creación de receta*/

  /***Inicio*** Proceso de Búsquedas de receta*/
  async getRecetaPorId(id: number) {
    const receta = await this.recetaRepository
      .getRecetaPorIdER(id)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      });
    if (!receta)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Receta '${id}' no encontrada`,
      });
    const recetaVerificadaCaducidad = await this.updateFechaCaducidadReceta(
      receta,
    );
    return recetaVerificadaCaducidad;
  }

  async getRecetaPorOid(oid: string) {
    const receta = await this.recetaRepository
      .getRecetaPorOidER(oid)
      .catch((error) => {
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      });
    if (!receta)
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Receta '${oid}' no encontrado`,
      });

    // this.verificarEstadoReceta(receta);
    // const recetaVerificadaCaducidad = await this.updateFechaCaducidadReceta(
    //   receta,
    // );
    // this.verificarBloqueoRecetaParaBusquedas(recetaVerificadaCaducidad);
    return receta;
  }

  async getRecetaPorOidConVerificacionEstado(oid: string) {
    const receta = await this.getRecetaPorOid(oid);
    this.verificarEstadoReceta(receta);
    const recetaVerificadaCaducidad = await this.updateFechaCaducidadReceta(
      receta,
    );
    this.verificarBloqueoRecetaParaBusquedas(recetaVerificadaCaducidad);
    return receta;
  }

  async getRecetaPorOidParaValidacion(oid: string) {
    const receta = await this.getRecetaPorOid(oid);
    const recetaVerificadaCaducidad = await this.updateFechaCaducidadReceta(
      receta,
    );
    return recetaVerificadaCaducidad;
  }

  /***Inicio*** Proceso de Búsquedas de receta*/

  /***Inicio*** Proceso de Validación de receta*/
  async validatePreciosReceta(validateRecetaDto: ValidateRecetaDto) {
    let receta = await this.getRecetaPorOidParaValidacion(
      validateRecetaDto.oid,
    );

    this.verificarEstadoReceta(receta);
    this.verificarBloqueoRecetaParaValidacionPrecios(
      receta,
      validateRecetaDto.farmacia_id,
    );
    await this.verificarCantidadesRecetaDetalle(receta, validateRecetaDto);
    const mensajeError: string[] = [];
    await Promise.all(
      validateRecetaDto.recetaDetalle.map(async (detalleValidacion) => {
        const recetaDatalle =
          await this.recetaDetalleService.getRecetaDetallePorId(
            detalleValidacion.id,
          );
        const precioTarifario = parseFloat(
          recetaDatalle.precio_tarifario.toFixed(6),
        );
        if (precioTarifario < detalleValidacion.precio_farmacia) {
          mensajeError.push(
            ` Med. ${
              detalleValidacion.medicamento_id
            }: precio_farmacia ${detalleValidacion.precio_farmacia.toFixed(
              6,
            )} excede tarifario ${recetaDatalle.precio_tarifario.toFixed(6)}`,
          );
        }
      }),
    );
    if (mensajeError.length != 0) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: mensajeError.join(';'),
      });
    }
    receta = Object.assign(receta, validateRecetaDto);
    receta = await this.prepararTiempoBloqueo(
      receta,
      validateRecetaDto.farmacia_id,
    );

    return await this.transaccionRecetaDetallePreciosFarmacia(receta);
  }

  async transaccionRecetaDetallePreciosFarmacia(receta: Receta) {
    return await this.connection
      .transaction(async (manager) => {
        await Promise.all(
          receta.recetaDetalle.map(async (detalle) => {
            const recetaDetalle =
              await this.recetaDetalleService.getRecetaDetallePorId(detalle.id);
            const recetaDetalleGuardar = Object.assign(recetaDetalle, detalle);
            await manager.save(recetaDetalleGuardar);
          }),
        );
        //delete receta.recetaDetalle;
        const recetaAutorizada = await this.prepararCodigoAutorizacion(receta);
        return await manager.save(recetaAutorizada);
      })
      .catch((error) => {
        const message = error.message as string;
        if (message.includes('ORA-01407')) {
          throw new RpcException({
            statusCode: HttpStatus.BAD_REQUEST,
            message:
              'Campos del objeto recetaDetalle incompleto, consulte nuevamente la receta.',
          });
        }
        throw new RpcException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      });
  }
  /***Fin*** Proceso de Validación de receta*/

  /***Inicio*** Proceso de Edición de receta*/
  async updateEstadoReceta(receta: Receta, estadoReceta: number) {
    receta.estado_receta_id = estadoReceta;
    return await this.recetaRepository.save(receta).catch((error) => {
      throw new RpcException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    });
  }

  async updateAnulacionReceta(
    updateAnulacionRecetaDto: UpdateAnulacionRecetaDto,
  ) {
    const receta = await this.getRecetaPorOidConVerificacionEstado(
      updateAnulacionRecetaDto.oid,
    );
    this.verificarEstadoReceta(receta);
    if (
      receta.establecimiento_id != updateAnulacionRecetaDto.establecimiento_id
    )
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `La receta ${receta.oid} no fue emitida por el establecimiento ${updateAnulacionRecetaDto.establecimiento_id}`,
      });
    //Implementar validacion de llave de anulacion
    return await this.updateEstadoReceta(
      receta,
      Constantes.ESTADO_RECETA_ANULADO_ORIGEN,
    );
  }

  async updateFechaCaducidadReceta(receta: Receta) {
    const ahora = new Date();

    if (receta.fecha_caducidad.getTime() < ahora.getTime()) {
      this.updateEstadoReceta(receta, Constantes.ESTADO_RECETA_CADUCADO);
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Receta '${receta.oid}' se encuentra caducada`,
      });
    }
    return receta;
  }
  /***Fin*** Proceso de Edición de receta*/

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

  async prepararValidadorReceta(
    createRecetaDto: CreateRecetaDto,
    receta: Receta,
  ) {
    if (createRecetaDto.validador != null) {
      const validador =
        await this.profesionalSaludService.getProfesionalSaludPorIdentificacion(
          createRecetaDto.validador.persona.identificacion,
        );
      receta.estado_receta_id = Constantes.ESTADO_RECETA_VALIDADO;
      receta.validador_id = validador.persona_id;
    }
    return receta;
  }

  async verificarCantidadesRecetaDetalle(
    receta: Receta,
    validateRecetaDto: ValidateRecetaDto,
  ) {
    const recetaDatelle = receta.recetaDetalle;
    const recetaDetalleValidacion = validateRecetaDto.recetaDetalle;
    if (recetaDatelle.length != recetaDetalleValidacion.length) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Campos del objeto recetaDetalle incompleto`,
      });
    }
    const mensajeError: string[] = [];
    await Promise.all(
      recetaDatelle.map((detalle, index) => {
        if (
          detalle.cantidad_prescrita !=
          recetaDetalleValidacion[index].cantidad_prescrita
        ) {
          mensajeError.push(
            ` Med. ${detalle.medicamento_id}: La cantidad prescrita '${recetaDetalleValidacion[index].cantidad_prescrita}' es diferente de la cantidad de la receta '${detalle.cantidad_prescrita}'`,
          );
        }
      }),
    );
    if (mensajeError.length != 0) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: mensajeError.join(';'),
      });
    }
  }

  verificarEstadoReceta(receta: Receta) {
    // if (receta.estado_receta_id == Constantes.ESTADO_RECETA_PREESCRITO)
    //   return receta;

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
  }

  verificarBloqueoRecetaParaBusquedas(receta: Receta) {
    const ahora = new Date();
    if (receta.bloqueo_tiempo?.getTime() > ahora.getTime()) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Receta ${receta.oid} se encuentra en proceso de dispensación. Inténtelo nuevamente más tarde`,
      });
    }
  }

  verificarBloqueoRecetaParaValidacionPrecios(
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
  }

  verificarFechaReceta(
    fechaReceta: Date,
    fechaCaducidad: Date,
    fechaValidacion: Date,
  ): void {
    const ahora = new Date();
    ahora.setHours(0, 0, 0, 0);

    const arrfechaReceta = fechaReceta.toLocaleDateString().split('/');

    const fechaRecetaDate = new Date(
      `${arrfechaReceta[2]}-${arrfechaReceta[1]}-${arrfechaReceta[0]}`,
    );

    const arrfechaCaducidadDate = fechaCaducidad
      .toLocaleDateString()
      .split('/');

    const fechaCaducidadDate = new Date(
      `${arrfechaCaducidadDate[2]}-${arrfechaCaducidadDate[1]}-${arrfechaCaducidadDate[0]}`,
    );

    if (fechaRecetaDate.getTime() != ahora.getTime()) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Fecha de receta ${fechaReceta.toLocaleDateString()} debe ser registrada con la fecha de hoy ${ahora.toLocaleDateString()}`,
      });
    }
    if (fechaRecetaDate.getTime() > fechaCaducidadDate.getTime()) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Fecha de receta ${fechaReceta.toLocaleDateString()} es mayor a fecha de caducidad ${fechaCaducidad.toLocaleDateString()}`,
      });
    }

    if (
      fechaValidacion.getTime() < fechaReceta.getTime() ||
      fechaValidacion.getTime() > fechaCaducidad.getTime()
    ) {
      throw new RpcException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Fecha de validación debe estar entre fecha de receta ${fechaReceta.toLocaleDateString()} y fecha de caducidad ${fechaCaducidad.toLocaleDateString()}`,
      });
    }
  }
}
