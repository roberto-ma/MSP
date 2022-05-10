import { EntityRepository, Repository } from 'typeorm';
import { Paciente } from '../entities/paciente.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(Paciente)
export class PacienteRepository extends Repository<Paciente> {
  async getPacientePorIdER(pacienteId: number) {
    return await this.findOne({
      where: {
        persona_id: pacienteId,
        //activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
