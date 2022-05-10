import { EntityRepository, Repository } from 'typeorm';
import { Etnia } from '../entities/etnia.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(Etnia)
export class EtniaRepository extends Repository<Etnia> {
  async getEtniaPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getEtniaPorCodigoPras(codigoPras: string) {
    return await this.findOne({
      where: {
        codigoPras: codigoPras,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getEstadoTodos() {
    return await this.find({});
  }
}
