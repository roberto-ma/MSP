import { EntityRepository, Repository } from 'typeorm';
import { DosisMedida } from '../entities/dosis-medida.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(DosisMedida)
export class DosisMedidaRepository extends Repository<DosisMedida> {
  async getDosisMedidaPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getDosisMedidaTodos() {
    return await this.find({});
  }
}
