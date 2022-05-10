import { CreateProfesionalSaludDto } from '../../dto/profesional-salud.dto';
import { ProfesionalSalud } from '../../entities/profesional-salud.entity';
import { plainToClass } from 'class-transformer';

export class ProfesionalSaludServiceMock {
  async createProfesionalSalud(
    createSolicitudDto: CreateProfesionalSaludDto,
  ): Promise<ProfesionalSalud> {
    const profesionalSalud = plainToClass(ProfesionalSalud, createSolicitudDto);
    return {
      persona_id: Math.random() * (1000 - 1) + 1,
      ...profesionalSalud,
    };
  }

  getProfesionalSaludPorIdentificacion(identificacion: string) {
    const data = {
      persona_id: 1688095,
      codigo_acess: '12345678915',
      especialidad_id: 1,
      rol_profesional_id: 1,
      establecimiento_id: 1,
      itinerante: 1,
      psicotropico: 1,
      persona: {
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
      },
    };
    return plainToClass(ProfesionalSalud, data);
  }

  getProfesionalSaludPorId(id: number) {
    const data = {
      persona_id: id,
      codigo_acess: '12345678915',
      especialidad_id: 1,
      rol_profesional_id: 1,
      establecimiento_id: 1,
      itinerante: 1,
      psicotropico: 1,
      persona: {
        id: 1688095,
        tipo_identificacion_id: 2,
        identificacion: '12345678915',
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
      },
    };
    return plainToClass(ProfesionalSalud, data);
  }
}
