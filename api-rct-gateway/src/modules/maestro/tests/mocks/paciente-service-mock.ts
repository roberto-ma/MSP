import { plainToClass } from 'class-transformer';
import { CreatePacienteDto } from '../../dto/paciente.dto';
import { DataTest } from './data-test';

export class PacienteServiceMock {
  async createPaciente(createPacienteDto: CreatePacienteDto) {
    return Promise.resolve({
      id: Math.random() * (1000 - 1) + 1,
      ...createPacienteDto,
    });
  }

  async getPacientePorIdentificacion(identificacion: string) {
    const data = DataTest.DATA_PACIENTE;
    const data_paciente = plainToClass(CreatePacienteDto, data);
    return Promise.resolve({
      id: Math.random() * (1000 - 1) + 1,
      ...data_paciente,
    });
  }
}
