import { EntityRepository, Repository } from 'typeorm';
import { NivelPrescripcion } from '../entities/nivel-prescripcion.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(NivelPrescripcion)
export class NivelPrescripcionRepository extends Repository<NivelPrescripcion> {
  async getNivelPrescripcionPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getNivelPrescripcionTodos() {
    return await this.find({});
  }
}
