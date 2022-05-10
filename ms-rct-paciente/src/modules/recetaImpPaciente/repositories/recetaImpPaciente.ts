/**
 * @ Author: Roberto Maldonado
 * @ Create Time: 2022-05-03 16:50:00
 * @ Description:
 */
import { EntityRepository, Repository } from 'typeorm';
import { RecetaP } from '../../recetaImpPaciente/entities/receta.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(RecetaP)
export class RecetaRepository extends Repository<RecetaP> {
  async getRecetaPorN(idI: number) {
    return await this.findOne({
      where: {
        numero_receta: idI,
      },
    });
  }
}
