import { EntityRepository, Repository } from 'typeorm';
import { Especialidad } from '../entities/especialidad.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(Especialidad)
export class EspecialidadRepository extends Repository<Especialidad> {
  async getEspecialidadPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
