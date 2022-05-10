import { EntityRepository, Repository } from 'typeorm';
import { RolProfesional } from '../entities/rol-profesional.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(RolProfesional)
export class RolProfesionalRepository extends Repository<RolProfesional> {
  async getRolProfesionalPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getRolProfesionalTodos() {
    return await this.find({});
  }
}
