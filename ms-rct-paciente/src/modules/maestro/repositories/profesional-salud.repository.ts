import { EntityRepository, Repository } from 'typeorm';
import { ProfesionalSalud } from '../entities/profesional-salud.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(ProfesionalSalud)
export class ProfesionalSaludRepository extends Repository<ProfesionalSalud> {
  async getProfesionalSaludPorIdER(profesionalSaludId: number) {
    return await this.findOne({
      where: {
        persona_id: profesionalSaludId,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
