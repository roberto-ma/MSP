import { EntityRepository, Repository } from 'typeorm';
import { Receta } from '../entities/receta.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(Receta)
export class RecetaRepository extends Repository<Receta> {
  async getRecetaPorIdER(recetaId: number) {
    return await this.findOne({
      where: {
        id: recetaId,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getRecetaPorOidER(recetaOid: string) {
    return await this.findOne({
      where: {
        oid: recetaOid,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
