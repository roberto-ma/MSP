export class Constantes {
  public static OID_RECETA_MSP = '1';

  public static OID_RECETA_ARRAY_LENGTH = 3;

  public static OID_RECETA_LENGTH_SEGMENTO1 = 1;
  public static OID_RECETA_LENGTH_SEGMENTO2 = 6;
  public static OID_RECETA_LENGTH_SEGMENTO3 = 8;

  public static DISPENSACION_CORRECTA = 'Proceso completado';

  public static ERROR_COMUNICACION_MICROSERVICIO =
    'Problemas de comunicación con el microservicio';

  public static ERROR_CONTACTESE = 'Contáctese con soporte';

  public static OPEN_API_MESSAGE_201 = 'Proceso completado con éxito';

  public static OPEN_API_MESSAGE_404 = 'no encontrado/s';

  public static OPEN_API_MESSAGE_500 =
    'Fallos en el sistema, conexión, BDD, entre otras';

  public static RESPONSE_CONCILIACION_CODE = [
    {
      codigoCuadreConciliacion: '01',
      mensaje: 'Conciliacion Realizada con exito',
    },
    {
      codigoCuadreConciliacion: '02',
      mensaje: 'No Cuadrado checksum incorrecto',
    },
    { codigoCuadreConciliacion: '03', mensaje: 'No Cuadrado' },
  ];

  public static RESPONSE_CONCION_DETALLE_CODE = [
    {
      codigo: '00',
      mensaje: 'La conciliación no requiere una verificación por detalle',
    },
    {
      codigo: '01',
      mensaje: 'Detalle Registrado con exito',
    },
    {
      codigo: '02',
      mensaje: 'Error',
    },
  ];

  public static DEFAULT_RESPONSE_CODE = '02';

  public static CT_CUADRA_CONCILIACION = {
    SI: 'SI',
    NO: 'NO',
  };

  public static CT_CUADRA_CONCILIACION_SI = 'SI';

  public static CONCILIACION_EXITO = {
    CODIGO: '01',
    DETALLE: 'Detalle Registrado con exito',
  };

  public static CONCILIACION_ERROR = {
    CODIGO: '02',
    DETALLE: 'Error',
  };

  public static CONCILIACION_NOEXISTE = {
    CODIGO: '03',
    DETALLE: 'Conciliación no existe',
  };
  public static KC_ROLE_CADENA_FARMACIA = 'cadena_farmacia';
  public static KC_ROLE_ENTIDAD_SALUD = 'entidad_salud';

  public static API_V1 = 1 as any;
  public static VERSION_API_ENCRYPT = 'v2';
  public static API_V2 = 2 as any;

  public static METHOD_POST = 'POST';
  public static METHOD_GET = 'GET';
}
