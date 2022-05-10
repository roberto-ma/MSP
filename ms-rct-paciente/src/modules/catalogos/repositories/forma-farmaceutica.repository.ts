import { EntityRepository, Repository } from 'typeorm';
import { FormaFarmaceutica } from '../entities/forma-farmaceutica.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(FormaFarmaceutica)
export class FormaFarmaceuticaRepository extends Repository<FormaFarmaceutica> {
  async getFormaFarmaceuticaPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getFormaFarmaceuticaTodos() {
    return await this.find({});
  }
}
