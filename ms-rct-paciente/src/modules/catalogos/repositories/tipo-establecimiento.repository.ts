import { EntityRepository, Repository } from 'typeorm';
import { TipoEstablecimiento } from '../entities/tipo-establecimiento.entity';
import { Constantes } from '../../../config/constantes';

@EntityRepository(TipoEstablecimiento)
export class TipoEstablecimientoRepository extends Repository<TipoEstablecimiento> {
  async getTipoEstablecimientoPorId(id: number) {
    return await this.findOne({
      where: {
        id: id,
        activo: Constantes.ESTADO_GENERAL_ACTIVO,
      },
    });
  }
}
