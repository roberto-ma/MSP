import { plainToClass } from 'class-transformer';
import { Persona } from '../../entities/persona.entity';

export class PersonaServiceMock {
  getPersonaPorIdentificacion(identificacion: string) {
    const data = {
      id: 1688095,
      tipo_identificacion_id: 2,
      identificacion: identificacion,
      apellidos: 'Carrion',
      nombres: 'Pedro',
      sexo: 'H',
      etnia_id: 1,
      religion_id: 1,
      lugar_nacimiento_id: 40101,
      discapacitado: '0',
      porcentaje_discapacidad: 0,
      pais_id: 1,
      fecha_nacimiento: new Date('1996-05-20'),
      vivo: 1,
      activo: 1,
    };
    return plainToClass(Persona, data);
  }
}
