import { EntityRepository, Repository } from 'typeorm';
import { Religion } from '../entities/religion.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(Religion)
export class ReligionRepository extends Repository<Religion> {
  async getReligionPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getReligionPorCodigoPras(codigoPras: string) {
    return await this.findOne({
      where: {
        codigoPras: codigoPras,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getReligionTodos() {
    return await this.find({});
  }
}
