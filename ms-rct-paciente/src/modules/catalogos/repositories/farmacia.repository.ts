import { EntityRepository, Repository } from 'typeorm';
import { Farmacia } from '../entities/farmacia.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(Farmacia)
export class FarmaciaRepository extends Repository<Farmacia> {
  async getFarmaciaPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getFarmaciaPorRuc(ruc: string) {
    return await this.findOne({
      where: {
        ruc: ruc,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
