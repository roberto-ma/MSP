export class Constantes {
  public static ACTIVO = 1;

  public static INTERNAL_SERVER_ERROR = 'Internal Server Error';

  public static NOT_FOUND = 'Not Found';

  public static ESTADO_GENERAL_ACTIVO = 1;

  public static ESTADO_GENERAL_INACTIVO = 0;

  public static CODIGO_AUTORIZACION_TIEMPO = 50; //segundos de 0 a 60

  public static CODIGO_AUTORIZACION_LENGTH = 6;

  public static BLOQUEO_TIEMPO = 2; //MINUTOS 0 A 59

  public static ESTADO_RECETA_PREESCRITO = 1;

  public static ESTADO_RECETA_VALIDADO = 2;

  public static ESTADO_RECETA_DISPENSADO = 3;

  public static ESTADO_RECETA_CADUCADO = 4;

  public static ESTADO_RECETA_RECHAZADO = 5;

  public static ESTADO_RECETA_ANULADO_ORIGEN = 6;

  public static ESTADO_RECETA_ANULADO_DISP = 7;

  public static CT_ROL_PRESCRIPTOR = 1;

  public static ERROR_CODIGO_AUTORIZACION = 'Codigo de autorización incorrecto';

  public static ERROR_CODIGO_AUTORIZACION_TIEMPO =
    'Código de autorización expirado. Intente nuevamente validar la receta ';

  public static ERROR_CODIGO_FECHA_DISPENSACIÓN =
    'Fecha de dispensación fuera del tiempo disponible para dispensar: ';

  public static ERROR_DEFAULT_TYPEORM = 'No se pudo culminar este proceso';

  public static ERROR_CONTACTESE = 'Contáctese con soporte';

  public static CT_PS_NO_PSICOTROPICOS = 0;

  public static CT_MED_NO_PSICOTROPICOS = 'N';

  /**
   * @const readonly Determinativos incluidos en los nombres completos
   */
  public static readonly DETERMINATIVOS_NOMBRES = [
    'DE',
    'DEL',
    'LA',
    'LAS',
    'LO',
    'LOS',
  ];

  public static CT_TIPO_DOCUMENTO_CEDULA = 2;

  public static CT_SEXO_HOMBRE_REGISTRO_CIVIL = 'HOMBRE';
  public static CT_SEXO_HOMBRE_ID_RECETA = 'M';
  public static CT_SEXO_MUJER_ID_RECETA = 'F';

  public static CT_CONDICION_PERSONA_FALLECIDO = 'FALLECIDO';
}
