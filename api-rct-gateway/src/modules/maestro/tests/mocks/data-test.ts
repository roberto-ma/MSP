export class DataTest {
  public static DATA_PACIENTE = {
    residencia: 'Quito',
    lugar_residencia_id: 1,
    tipo_telefono: 'Movil',
    telefono: '2154894856',
    email: 'admin@admin.com',
    alergia: 'polvo',
    persona: {
      tipo_identificacion_id: 6,
      identificacion: '121356285485',
      apellidos: 'Vera',
      nombres: 'Juan',
      sexo: 'M',
      etnia_id: 0,
      religion_id: 0,
      lugar_nacimiento_id: 0,
      discapacitado: 'No',
      porcentaje_discapacidad: 0,
      pais_id: 1,
      fecha_nacimiento: '1981-06-10T20:53:30.632Z',
    },
  };

  public static DATA_PERSONA = {
    tipo_identificacion_id: 2,
    identificacion: '1717195874',
    apellidos: 'MEJIA CANDO',
    nombres: 'JUAN MANUEL',
    sexo: 'M',
    etnia_id: 1,
    religion_id: 1,
    lugar_nacimiento_id: 10251,
    discapacitado: '1',
    porcentaje_discapacidad: 0,
    vivo: 1,
    pais_id: 1,
    fecha_nacimiento: '1981-01-01',
  };

  public static DATA_PROFESIONAL_SALUD = {
    codigo_acess: '2135485',
    especialidad_id: 1,
    rol_profesional_id: 2,
    establecimiento_id: 234,
    itinerante: 1,
    psicotropico: 1,
    persona: {
      tipo_identificacion_id: 1,
      identificacion: '3215469875',
      apellidos: 'RIVERA MAUTE',
      nombres: 'JUAN CARLOS',
      sexo: 'M',
      etnia_id: 1,
      religion_id: 1,
      lugar_nacimiento_id: 82377,
      discapacitado: 'N',
      porcentaje_discapacidad: 0,
      pais_id: 625,
      fecha_nacimiento: '2022-04-19T14:50:51.901Z',
    },
  };
}
