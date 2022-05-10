import { EntityRepository, Repository } from 'typeorm';
import { CadenaFarmacia } from '../entities/cadena-farmacia.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(CadenaFarmacia)
export class CadenaFarmaciaRepository extends Repository<CadenaFarmacia> {
  async getCadenaFarmaciaPorId(cadenaFarmaciaId: number) {
    return await this.findOne({
      where: {
        id: cadenaFarmaciaId,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
