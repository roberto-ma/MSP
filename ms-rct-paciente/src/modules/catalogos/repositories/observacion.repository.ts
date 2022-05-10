import { EntityRepository, Repository } from 'typeorm';
import { Observacion } from '../entities/observacion.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(Observacion)
export class ObservacionRepository extends Repository<Observacion> {
  async getObservacionPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
