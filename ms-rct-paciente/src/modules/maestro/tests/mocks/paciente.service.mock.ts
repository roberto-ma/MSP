import { CreatePacienteDto } from '../../dto/paciente.dto';
import { Paciente } from '../../entities/paciente.entity';
import { plainToClass } from 'class-transformer';

export class PacienteServiceMock {
  async createPaciente(
    createSolicitudDto: CreatePacienteDto,
  ): Promise<Paciente> {
    const paciente = plainToClass(Paciente, createSolicitudDto);
    return {
      persona_id: Math.random() * (1000 - 1) + 1,
      ...paciente,
    };
  }

  getPacientePorIdentificacion(identificacion: string) {
    const data = {
      persona_id: 1688095,
      residencia: 'Pueblo Unido',
      lugar_residencia_id: 40101,
      tipo_telefono: 'M',
      telefono: '0302010203',
      email: 'pcarrion@gmail.com',
      alergia: 'nignuna',
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
    return plainToClass(Paciente, data);
  }

  getPacientePorId(id: number) {
    const data = {
      persona_id: id,
      residencia: 'Pueblo Unido',
      lugar_residencia_id: 40101,
      tipo_telefono: 'M',
      telefono: '0302010203',
      email: 'pcarrion@gmail.com',
      alergia: 'nignuna',
      persona: {
        id: id,
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
    return plainToClass(Paciente, data);
  }

  //   async update(
  //     id: number,
  //     updateSolicitudDto: UpdateSolicitudDto,
  //   ): Promise<Solicitud> {
  //     return Promise.resolve({
  //       id: id,
  //       ...updateSolicitudDto,
  //     }) as Promise<Solicitud>;
  //   }
}
