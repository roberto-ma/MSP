import { EntityRepository, Repository } from 'typeorm';
import { LaboratorioFabricante } from '../entities/laboratorio-fabricante.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(LaboratorioFabricante)
export class LaboratorioFabricanteRepository extends Repository<LaboratorioFabricante> {
  async getLaboratorioFabricantePorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
