export class DataTest {
  public static DATA_RECETA = {
    oid: '1.049073.00000354',
    establecimiento_id: 49073,
    fecha_receta: '2022-04-18T09:42:19.000Z',
    fecha_caducidad: '2022-04-21T09:42:19.000Z',
    acompaniante_cedula: null,
    acompaniante: null,
    organico: {
      codigoZona: 'Z08',
      version: 1,
      activo: 1,
    },
    paciente: {
      persona: {
        tipo_identificacion_id: 2,
        identificacion: '0927206797',
        apellidos: 'ANDRADE  BONE',
        nombres: 'ESTEFANIA  PETRA',
        fecha_nacimiento: '1991-01-21',
      },
    },
    recetaDetalle: [
      {
        id: 3252,
        medicamento_id: 1,
        cantidad_prescrita: 30,
      },
      {
        id: 3253,
        medicamento_id: 2,
        cantidad_prescrita: 45,
      },
    ],
  };

  public static DATA_RECETA_PRESCRITA = {
    numero_receta: 1,
    establecimiento_id: 1,
    oid: '1.049073.00000354',
    paciente: {
      alergias: 'polvo',
      persona: {
        tipo_identificacion_id: 6,
        identificacion: '123456789',
      },
    },
    estado_paciente: '1',
    prescriptor: {
      codigo_acess: '1',
      psicotropico: 1,
      persona: {
        tipo_identificacion_id: 6,
        identificacion: '1234567890',
      },
    },
    fecha_receta: '2022-04-18T18:40:13.767Z',
    fecha_caducidad: '2022-04-18T18:40:13.767Z',
    cie_general_id: 1,
    servicio_salud_id: 1,
    tipo_atencion_id: 1,
    acompaniante_cedula: '3215487925',
    acompaniante: 'Carlos Sanchez',
    parentesco_id: 1,
    acompaniante_telefono: '02587456',
    acompaniante_email: 'admin@admin.com',
    fuente_datos_id: 1,
    usuario_registro: 'Alberto Rivas',
    codigo_atencion: '1235469709',
    recetaDetalle: [
      {
        medicamento_id: 1,
        cantidad_prescrita: 1,
        dispensacion_externa: 1,
        cie_id: 1,
        dosis_id: 1,
        frecuencia_id: 1,
        otra_frecuencia: '1',
        indicaciones: '1',
        dosis_cantidad: 0,
        duracion_tratamiento: 30,
      },
    ],
  };

  public static DATA_VALIDATE_RECETA = {
    oid: '1.049073.00000354',
    farmacia_id: 1,
    recetaDetalle: [
      {
        id: 1,
        medicamento_id: 1,
        cantidad_prescrita: 1,
        precio_farmacia: 1,
      },
    ],
  };

  public static DATA_ANULACION_RECETA = {
    oid: '1.049073.00000354',
    establecimiento_id: 1,
  };

  public static DATA_DISPENSACION = {
    receta_oid: '1.049073.00000354',
    codigo_autorizacion: 1,
    farmacia_id: 1,
    numero_orden: '1235485',
    fecha_dispensacion: '2022-04-18T20:01:14.654Z',
    identificacion_dispensador: 'Maurico Recalde',
    dispensador: 'Pedro Rivas',
    observacion: 'Ninguna',
    identificador_receptor: '23254875784',
    mensaje_autorizacion: 'Proceso completado',
    receptor: 'Mario Castro',
    valor_total: 25,
  };
}
