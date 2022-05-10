import { EntityRepository, Repository } from 'typeorm';
import { RecetaF } from '../../recetaFarmacia/entities/receta.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(RecetaF)
export class RecetaFarmaciaRepository extends Repository<RecetaF> {
  async getRecetaPorN(idI: number) {
    return await this.findOne({
      where: {
        numero_receta: idI,
      },
    });
  }
}
