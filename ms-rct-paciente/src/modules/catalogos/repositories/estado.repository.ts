import { EntityRepository, Repository } from 'typeorm';
import { Estado } from '../entities/estadoreceta.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(Estado)
export class EstadoRepository extends Repository<Estado> {
  async getEstadoPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getEstadoTodos() {
    return await this.find({});
  }
}
