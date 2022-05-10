import { EntityRepository, Repository } from 'typeorm';
import { TipoIdentificacion } from '../entities/tipo-identificacion.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(TipoIdentificacion)
export class TipoIdentificacionRepository extends Repository<TipoIdentificacion> {
  async getTipoIdentificacionPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getTipoIdentificacionTodos() {
    return await this.find({});
  }
}
