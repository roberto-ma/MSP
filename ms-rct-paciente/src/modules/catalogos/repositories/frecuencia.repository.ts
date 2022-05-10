import { EntityRepository, Repository } from 'typeorm';
import { Frecuencia } from '../entities/frecuencia.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(Frecuencia)
export class FrecuenciaRepository extends Repository<Frecuencia> {
  async getFrecuenciaPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getFrecuenciaTodos() {
    return await this.find({});
  }
}
