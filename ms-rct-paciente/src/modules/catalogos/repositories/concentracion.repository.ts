import { EntityRepository, Repository } from 'typeorm';
import { Concentracion } from '../entities/concentracion.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(Concentracion)
export class ConcentracionRepository extends Repository<Concentracion> {
  async getConcentracionPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getConcentracionTodos() {
    return await this.find({});
  }
}
