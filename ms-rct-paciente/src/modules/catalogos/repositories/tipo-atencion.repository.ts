import { EntityRepository, Repository } from 'typeorm';
import { TipoAtencion } from '../entities/tipo-atencion.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(TipoAtencion)
export class TipoAtencionRepository extends Repository<TipoAtencion> {
  async getTipoAtencionPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }

  async getTipoAtencionTodos() {
    return await this.find({});
  }
}
