import { EntityRepository, Repository } from 'typeorm';
import { Organico } from '../entities/organico.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(Organico)
export class OrganicoRepository extends Repository<Organico> {
  async getOrganicoPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getOrganicoPorCodigoCircuito(codigoCircuito: string) {
    return await this.find({
      where: {
        codigoCircuito: codigoCircuito,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
