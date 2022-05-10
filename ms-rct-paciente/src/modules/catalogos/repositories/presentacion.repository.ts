import { EntityRepository, Repository } from 'typeorm';
import { Presentacion } from '../entities/presentacion.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(Presentacion)
export class PresentacionRepository extends Repository<Presentacion> {
  async getPresentacionPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
