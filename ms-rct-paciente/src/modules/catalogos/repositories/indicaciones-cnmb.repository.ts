import { EntityRepository, Repository } from 'typeorm';
import { IndicacionesCnmb } from '../entities/indicaciones-cnmb.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(IndicacionesCnmb)
export class IndicacionesCnmbRepository extends Repository<IndicacionesCnmb> {
  async getIndicacionesCnmbPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
