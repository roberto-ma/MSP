import { number } from 'joi';

export class DataTest {
  public static DATA_CADENA_FARMACIA = {
    id: 1,
    nombreCadena: 'SANA SANA',
    llaveCriptografia: 'JKSYKSF78234JWFKDV7IW5',
    version: 1,
    activo: 1,
    ipPublica: '127.0.0.1',
    llaveAnulacion: 'JOSDKW3789235HJGR890DGRNKJ',
    rucCadena: '12354567890001',
  };

  public static DATA_CIE = {
    id: 1,
    codigoCie: 'B180',
    cie: 'B18',
    version: 10,
    activo: 1,
  };

  public static DATA_CONCENTRACION = {
    id: 1,
    concentracion: '',
    medicamentos: [
      {
        cum: '123',
        atc: 'abc',
        nivelAtencion_1: 'SI',
        nivelAtencion_2: 'NO',
        nivelAtencion_3: 'SI',
        psicotropicoEstupefaciente: 'NO',
        antimicrobiano: 'SI',
        dispensacionExterna: 'SI',
        fiscalizacion: 'NO',
      },
    ],
    version: 1,
    activo: 1,
  };

  public static DATA_CONTRAINDICACION = {
    id: 1,
    contraindicacion: 'contraindicacion',
    version: 1,
    activo: 1,
    medicamentos: [
      {
        cum: '123',
        atc: 'abc',
        nivelAtencion_1: 'SI',
        nivelAtencion_2: 'NO',
        nivelAtencion_3: 'SI',
        psicotropicoEstupefaciente: 'NO',
        antimicrobiano: 'SI',
        dispensacionExterna: 'SI',
        fiscalizacion: 'NO',
      },
    ],
  };

  public static DATA_DOSIFICACION = {
    id: 1,
    version: 1,
    activo: 1,
    dosificacion: 'Casa 12 horas',
    dosificacion2: 'Cada 8 horas',
    medicamentos: [
      {
        cum: '123',
        atc: 'abc',
        nivelAtencion_1: 'SI',
        nivelAtencion_2: 'NO',
        nivelAtencion_3: 'SI',
        psicotropicoEstupefaciente: 'NO',
        antimicrobiano: 'SI',
        dispensacionExterna: 'SI',
        fiscalizacion: 'NO',
      },
    ],
  };

  public static DATA_DOSIS_MEDIDA = {
    id: 1,
    dosisMedida: 'mg',
    unidad: 'g',
    version: 1,
    activo: 1,
  };

  public static DATA_ESPECIALIDAD = {
    id: 1,
    especialidad: 'Laparoscopía',
    dispositivos: [
      {
        cudim: '1',
        especificacionTecnica: 'General',
        version: 1,
        activo: 1,
      },
    ],
    version: 1,
    activo: 1,
  };

  public static DATA_ESTABLECIMIENTO = {
    id: 1,
    unicodigo: '98SDFUJ',
    ruc: '125154156456486',
    nombreOficial: 'SANA SANA',
    nombreComercial: 'SANA SANA',
    numeroEstablecimiento: '2389',
    organico_id: 1,
    telefono: '5645645',
    email: 'admin@admin.com',
    direccion: 'av ilaló',
    referencia: 'casa naranja',
    lugar_geografico_id: 1,
    latitud: '98712834798234',
    longitud: '986278936423',
    activo: '1',
    version: 1,
    sistema: 1,
  };

  public static DATA_ESTADO_RECETA = {
    id: 1,
    estado: 'ACTIVO',
    version: 1,
    activo: 1,
  };

  public static DATA_ETNIA = {
    id: 1,
    etnia: 'Mestizo',
    codigoPras: '1',
    version: 1,
    activo: 1,
  };

  public static DATA_FARMACIA = {
    id: 1,
    farmacia: '1265465',
    ruc: '23564345601001',
    direccion: 'España y la que cruza',
    version: 1,
    activo: 1,
    fechaRegistro: '2022-04-18T18:40:13.767Z',
    usuarioRegistro: 'Mario Rivas',
    fechaModificacion: '2022-04-18T18:40:13.767Z',
    usuarioModificacion: 'Eduardo Casas',
    cadenafarmaciaId: 1,
  };

  public static DATA_FORMA_FARMACEUTICA = {
    id: 1,
    formaFarmaceutica: 'Gotero',
    descripcion: 'Gotas',
    codigo: 'GT',
    version: 2,
    activo: 1,
  };

  public static DATA_FRECUENCIA = {
    id: 1,
    frecuencia: 'cada 6 horas',
    numeroVeces: '10',
    version: 1,
    activo: 1,
  };

  public static DATA_FUENTE_DATOS = {
    id: 1,
    fuenteDatos: 'LA FUENTE',
    version: 1,
    activo: 1,
    nombreSistema: 'FUENTE DE DATOS',
    ipPublica: '128.256.254.45',
    establecimientoId: 1,
    llaveCriptografia: 'LPASKUiuOKÑPSUPSDFJOUISD',
    llaveAnulacion: '89273HFSUYFKSJDJUFSJYJHW',
  };

  public static DATA_INDICACIONES_CNMB = {
    id: 1,
    indicacionCnmb: 'Cualquier cosa',
    version: 1,
    activo: 1,
    medicamentos: [
      {
        cum: '123',
        atc: 'abc',
        nivelAtencion_1: 'SI',
        nivelAtencion_2: 'NO',
        nivelAtencion_3: 'SI',
        psicotropicoEstupefaciente: 'NO',
        antimicrobiano: 'SI',
        dispensacionExterna: 'SI',
        fiscalizacion: 'NO',
      },
    ],
  };

  public static DATA_INSTITUCION = {
    id: 1,
    institucion: 'msp',
    version: 1,
    activo: 1,
  };

  public static DATA_INTERACCION = {
    id: 1,
    interaccion1: 'PRIMERA',
    interaccion2: 'SEGUNDA',
    version: 1,
    activo: 2,
  };

  public static DATA_LABORATORIO_FABRICANTE = {
    id: 1,
    laboratorioFabricante: 'PFIZER',
    version: 1,
    activo: 1,
  };

  public static DATA_LUGAR_GEOGRAFICO = {
    id: 1,
    codigoParroquia: '98967',
    parroquia: 'San Vicente',
    codigoCanton: '908723',
    canton: 'Quito',
    codigoProvincia: '1717',
    provincia: 'Pichincha',
    codigopras: '183783',
    version: 1,
    activo: 1,
  };

  public static DATA_MEDICAMENTO = {
    id: 1,
    codigoParroquia: '98967',
    parroquia: 'San Vicente',
    codigoCanton: '908723',
    canton: 'Quito',
    codigoProvincia: '1717',
    provincia: 'Pichincha',
    codigopras: '183783',
    version: 1,
    activo: 1,
  };

  public static DATA_NIVEL_PRESCRIPCION = {
    id: 1,
    nivelPrescripcion: 'PRIMER NIVEL',
    version: 1,
    activo: 1,
    descripcion: 'DESCRIPCION',
  };

  public static DATA_OBSERVACION = {
    id: 1,
    observacion: 'Observación',
  };

  public static DATA_ORGANICO = {
    id: 1,
    codigoCircuito: '123',
    circuito: '456',
    codigoDistrito: 'COD12',
    distrito: '001',
    codigoZona: '002',
    version: 1,
    activo: 1,
  };

  public static DATA_PRESENTACION = {
    id: 1,
    presentacion: 'presentacion',
    version: 1,
    activo: 1,
  };

  public static DATA_PRODUCTO = {
    id: 1,
    nombreGenerico: 'NOMBRE',
    nombreComercial: 'COMERCIAL',
    precio: 10,
    fecPrecio: 11,
    version: 1,
    externo: 1,
    activo: 1,
  };

  public static DATA_REACCION_ADVERSA = {
    id: 1,
    reaccionAdversa: 'REACCION',
    version: 1,
    activo: 1,
  };

  public static DATA_REGISTRO_TERAPEUTICO = {
    id: 1,
    registroTerapeutico: 'REGISTRO',
    version: 1,
    activo: 1,
  };

  public static DATA_RELIGION = {
    id: 1,
    religion: 'RELIGION',
    codigoPras: '123',
    version: 1,
    activo: 1,
  };

  public static DATA_RIESGO_MEDICAMENTO = {
    id: 1,
    riesgoMedicamento: 'riesgo',
    version: 1,
    activo: 1,
    dispositivos: [
      {
        cudim: '1',
        especificacionTecnica: 'General',
        version: 1,
        activo: 1,
      },
    ],
  };

  public static DATA_ROL_PROFESIONAL = {
    id: 1,
    rolProfesional: 'MEDICO',
    version: 1,
    activo: 1,
  };

  public static DATA_SERVICIO_SALUD = {
    id: 1,
    servicioSalud: 'SERVICIO',
    version: 1,
    activo: 1,
  };

  public static DATA_TARIFARIO = {
    id: 1,
    productoId: 1,
    fechaDesde: '2022-04-18T18:40:13.767Z',
    fechaHasta: '2022-04-18T18:40:13.767Z',
    precioUnitario: 10,
    fechaRegistro: '2022-04-18T18:40:13.767Z',
    usuarioRegistro: 'MARO CASAS',
    version: 1,
    activo: 1,
  };

  public static DATA_TIPO_ATENCION = {
    id: 1,
    tipoAtencion: 'PRIMARIA',
    version: 1,
    activo: 1,
  };

  public static DATA_TIPO_ESTABLECIMIENTO = {
    id: 1,
    tipoEstablecimiento: 'CENTRO DE SALUD',
    name: 'PRIMER NIVEL',
    version: 1,
    activo: 1,
  };

  public static DATA_TIPO_IDENTIFICACION = {
    id: 1,
    tipoIdentificacion: 'CEDULA',
    name: '65',
    version: 1,
    activo: 1,
  };

  public static DATA_TIPO_LAB_ANALISIS_CLINICO = {
    id: 1,
    tipoLabAnalisisClinico: 'CLINICA',
    version: 1,
    activo: 1,
  };

  public static DATA_VIA_ADMINISTRACION = {
    abreviatura: 'IP',
    id: 1,
    viaAdministracion: 'INTRA',
    version: 1,
    activo: 1,
  };
}
